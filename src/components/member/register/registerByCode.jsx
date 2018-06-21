import React, {Component} from 'react';
import './register.less'
import Tab from '../../../pages/tab/tab';
import Button from '../../../pages/button/button';
import Dialog from '../../../pages/toast/toast';
import { Redirect } from 'react-router-dom';  
import { Modal, Toast } from 'antd-mobile';
import  {Api} from  '../../../utils/lib/lib.js';
import axios from 'axios';
import qs from 'qs';
import {getCheckCode,verifyRegisterParam,registerProtocol,register} from './actions';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state= {
            isShowBtn: {
                pswFlag: false,
                userFlag: false
            },
            isShowToast:false,
            showSetPsw:false,
            toastText:''
        }
    }
    componentDidMount(){
        function setTitle(val){
            document.title = val;
        }
        setTitle('设置登录密码');
        if(window.localStorage.getItem('loginPwd')){
            this.refs.userCode.val = window.localStorage.getItem('loginPwd')
        }   
        this.refs.userCode.focus();
    }
    handlerClick(){
        // window.localStorage.clear('loginPwd');                
        console.log(this.state);
        if(!this.state.isShowBtn.userFlag){
           Toast.info('请输入您的密码',2);
           this.refs.userCode.focus();
           return
        }
        if(!this.state.isShowBtn.pswFlag){
           Toast.info('请确认您的密码',2);
           this.refs.confirmCode.focus()       
            return
        }
        if(this.refs.confirmCode.value!==this.refs.userCode.value ){
            Toast.info('两次输入不一致!',2);
            return;
        }
        // var reg = /^(?!\D+$).(?![^a-zA-Z]+$)\S{8,20}$/; 
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/ 
        console.log(this.refs.confirmCode.value)
        if(!reg.test(this.refs.confirmCode.value)){
            Toast.info('请输入8-20位英文和数字组合密码!',2);
            return
        };
        window.localStorage.setItem('loginPwd',this.refs.confirmCode.value);
        let phone = window.localStorage.getItem('phone');
        let refereePhone = window.localStorage.getItem('refereePhone');
        let code = window.localStorage.getItem('code');
        let payPass = window.localStorage.getItem('payPass');
        let loginPass = window.localStorage.getItem('loginPwd');

        if(!refereePhone){
            let data  = qs.stringify({phone:phone,loginPass:this.refs.confirmCode.value,verificationCode:code,payPass:payPass})
            axios.post(Api.memberURL+ '/member/register/register',data,{
                headers:{
                    'channel': 'Android'                    
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.code === 0 ){   
                     Toast.info('注册成功!',1) ;
                     setTimeout(()=>{
                        this.props.history.push('/login')                         
                     },1200);
                     
                }else{
                    Toast.info(res.data.errorMsg,2);
                    // setTimeout(()=>{
                    //     this.props.history.push('/login')                         
                    //  },2000)
                }
            }).catch((err)=>{
                console.log(err);
                
            }) 
        }else{
            let data  = qs.stringify({phone:phone,loginPass:this.refs.confirmCode.value,verificationCode:code,payPass:payPass,refereePhone:refereePhone})
            axios.post(Api.memberURL+ '/member/register/register',data,{
                headers:{
                    'channel': 'Android'                    
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.code === 0 ){
                     Toast.info('注册成功!',1) ;
                     setTimeout(()=>{
                        this.props.history.push('/login')                         
                     },1200)
                }else{
                    Toast.info(res.data.errorMsg,2);
                    setTimeout(()=>{
                        this.props.history.push('/login')                         
                     },2000)
                }
            }).catch((err)=>{
                console.log(err);
                
            }) 
        }
             
    }
    userCode(e){
        if(e.target.value.trim().length){
            this.setState({
                ...this.state,
                isShowBtn: {
                    ...this.state.isShowBtn,
                    userFlag: true
                },
                toastText:'',
                isShowToast :false
            })
        }else{
            this.setState({
                ...this.state,
                isShowBtn: {
                    ...this.state.isShowBtn,
                  userFlag: false
                }
            })
        }
    }
    confirmCode(e){
        if(e.target.value.trim().length){
            this.setState({
                ...this.state,
                isShowBtn: {
                    ...this.state.isShowBtn,
                   pswFlag: true
                }
            })
        }else{
            this.setState({
                ...this.state,
                isShowBtn: {
                    ...this.state.isShowBtn,
                   pswFlag: false
                }
            })
        }
    }
    handlerToast (toastText ,delay){
        this.setState({
            ...this.state,
            toastText :toastText,            
            isShowToast :true
        })
        this.toastTimer = window.setTimeout(()=>{
            this.setState({
                ...this.state,
                toastText :toastText,
                isShowToast :false
            })
        },delay)
    }
    clearUserCode(){
        this.refs.userCode.value = '';
        this.setState({
            ...this.state,
            isShowBtn: {
                ...this.state.isShowBtn,
              userFlag: false
            }
        })
    }
    clearConfirm(){
        this.refs.confirmCode.value = '';
        this.setState({
            ...this.state,
            isShowBtn: {
                ...this.state.isShowBtn,
              pswFlag: false
            }
        })
    }
    render(){
        let nav = { title: '注册', operate: '  ' }; 
        let text = '确定';     
        if(this.state.showSetPsw){
            return <Redirect push to="/setPwd" />
        } else{
            return (
                <div className='register-container_'>
                    <Dialog  isShowToast = {this.state.isShowToast}  toastText = {this.state.toastText}></Dialog>
                    {/* <Tab nav={nav}/> */}
                    <ul>
                        <li>
                            <label htmlFor='accomment'>
                                <img src={require('../../../assets/img/lock_icon@2x.png')} alt=''/>
                            </label> 
                            <input onChange = {this.userCode.bind(this)} ref='userCode' type='password'  id='accomment' placeholder='请输入您的密码' maxLength={20}/>
                            <img onClick = {this.clearUserCode.bind(this)} className = {this.state.isShowBtn.userFlag ?"showActive":'hiddenActive'} src= {require('../../../assets/img/close_btn@2x.png')} alt=''/>
                        </li>
                        <li>
                            <label htmlFor='phone'>
                                <img src={require('../../../assets/img/lock_icon@2x.png')} alt=''/>
                            </label>
                            <input ref='confirmCode' onChange = {this.confirmCode.bind(this)} type='password'  id='phone' placeholder='请确认您的密码'  maxLength={20}/> 
                            <img onClick = {this.clearConfirm.bind(this)} className = {this.state.isShowBtn.pswFlag?"showActive":'hiddenActive'} src= {require('../../../assets/img/close_btn@2x.png')} alt=''/>                            
                        </li>
                    </ul>
                    <p className ='protocol'  >
                        <i>
                          !                       
                        </i>
                        <span >密码由8-20位英文字母和数字组成</span>
                    </p>
                    <Button handlerClick={this.handlerClick.bind(this)} styleSheet={{ color: '#fff',width:'90%', background: (this.state.isShowBtn.userFlag && this.state.isShowBtn.pswFlag) ? "#D30000" : '#ddd' }} text={text} />                
                </div>
            )
        }       
      
    }
}