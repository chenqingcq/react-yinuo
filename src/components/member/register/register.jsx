import React, {Component} from 'react';
import './register.less'
import Tab from '../../../pages/tab/tab';
import Button from '../../../pages/button/button';
import Dialog from '../../../pages/toast/toast';
import { Redirect } from 'react-router-dom';  
import { Modal, Toast } from 'antd-mobile';
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
        setTitle('注册');
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
            Toast.info('请输入8-20位英文和数字的密码!',2);
            return
        };
        window.localStorage.setItem('loginPwd',this.refs.confirmCode.value);
        this.props.history.push('/member/setPayFisrtTime')  ;   
    }
    userCode(e){
        if(e.target.value.trim()){
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
        if(e.target.value.trim()){
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
    render(){
        let nav = { title: '注册', operate: '  ' }; 
        let text = '确定';      
            return (
                <div className='register-container_'>
                    <ul>
                        <li>
                            <label htmlFor='accomment'>
                                <img src={require('../../../assets/img/lock_icon@2x.png')} alt=''/>
                            </label>
                            <input onChange = {this.userCode.bind(this)} ref='userCode' type='password'  id='accomment' placeholder='请输入您的密码' maxLength={20}/>
                        </li>
                        <li>
                            <label htmlFor='phone'>
                                <img src={require('../../../assets/img/lock_icon@2x.png')} alt=''/>
                            </label>
                            <input ref='confirmCode' onChange = {this.confirmCode.bind(this)} type='password'  id='phone' placeholder='请确认您的密码'  maxLength={20}/> 
                        </li>
                    </ul>
                    <p className ='protocol'  >
                        <i>
                          !                       
                        </i>
                        <span >密码由8-20位英文字母和数字组成</span>
                    </p>
                    <Button handlerClick={this.handlerClick.bind(this)} styleSheet={{ color: '#fff',width:'90%', background: "#D30000"}} text={text} />                
                </div>
            )      
    }
}