import React , {Component} from 'react'
import Tab from '../../../pages/tab/tab';
import Btn from '../../../pages/button/button';
import {Toast,Modal} from 'antd-mobile';
import Dialog from '../../../pages/toast/toast';
import {getCheckCode,verifyRegisterParam,registerProtocol} from './actions';
import { Redirect } from 'react-router-dom';  
import './register.less';
import './register.less';
import axios from 'axios';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkCodeText : '获取验证码',
            toastText :'',
            userProcText:'',
            count:60,
            isShowtoast:false,
            redirect:false,
            modal:false,
            height:300,
            width:321,
            isCounting:false

        }
    }
    componentDidMount(){
        function setTitle(val){
            document.title = val;
        }
        setTitle('注册');
        if(window.localStorage.getItem('refereePhone')){//缓存
            this.refs.accommender.value = window.localStorage.getItem('refereePhone')            
        }
        if(window.localStorage.getItem('phone')){
            this.refs.phone.value = window.localStorage.getItem('phone')            
        }
    }
    componentWillUnmount(){
        if(this.timer){
            window.clearInterval(this.timer);                                                                         
        }
    }
    handerNext(){
        console.log(111)
        // BrowserHistory.push('registerByCoder');
        let exp =/^1[3,4,5,7,8]\d{9}$/;
        if(this.refs.accommender.value.trim().length && !exp.test(this.refs.accommender.value.trim())){
            Toast.info('请审核推荐人手机号',1);
            this.refs.accommender.focus();
            return ;
        }
        if(!this.refs.phone.value.trim()){
            Toast.info('请输入您的手机号',1);
            this.refs.phone.focus();
            return ;
        }
        if(!exp.test(this.refs.phone.value.trim())){
            Toast.info('请审核您的手机号',1);
            this.refs.phone.focus();
            return ;
        }
        
        if(!this.refs.checkcode.value.trim()){
            Toast.info('请输入验证码',1);
            this.refs.checkcode.focus();
            return ;
        };
        if(!this.refs.agreeProtol.classList.contains('active')){
            Toast.info('已同意用户注册协议?',1);
            return ;
        }
        this.refs.accommender.value.trim().length && window.localStorage.setItem('refereePhone',this.refs.accommender.value);//推荐人手机号        
        window.localStorage.setItem('phone',this.refs.phone.value)
        window.localStorage.setItem('code',this.refs.checkcode.value);
        this.setState({...this.state,redirect: true});    //跳往密码页  
        window.clearInterval(this.timer);                                                             
    }
    changeCode(){
        //验证是否已经注册
        // verifyRegisterParam().then((res)=>{
        //     console.log(res)
        // }).catch((err)=>{
        //     console.log(err)
        // })
        if(this.timer){
            window.clearInterval(this.timer);
            this.setState({
                ...this.state,
                count:60,
                checkCodeText :`重新获取${this.state.count}s`
            })
            this.timer = window.setInterval(()=>{
                if(this.state.count <=0){      
                    window.clearInterval(this.timer);     
                    this.setState({
                        ...this.state,                        
                        count:60,
                        checkCodeText :'获取验证码'
                    })
                    return ;                             
                }else{
                    this.setState({
                        ...this.state,
                        count : this.state.count -1,
                        checkCodeText :`重新获取${this.state.count }s`
                    })
                }
            },1000)
            // getCheckCode({type:3,phone:this.refs.phone.value})
            axios.post(lib.Api.memberURL+'/base/sms/sendCode',qs.stringify(
                {
                    type:3,phone:this.refs.phone.value
                }
            ), {
                headers: {
                //   'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                  'channel': 'Android'
                }
              })
            .then((res)=>{
                console.log(res);
                if(res.data.code === 1 ){
                    Toast.info (res.data.errorMsg,1);
                    window.clearInterval(this.timer);                
                    this.setState({
                        ...this.state,                        
                        count:60,
                        checkCodeText :'获取验证码'
                    })
                }
            }).catch((err)=>{
                console.log(err);
                Toast.fail(err,1);
                        
            })
        }else{
            
            //获取验证码
            if(!this.refs.phone.value.trim()){
                this.handlerToast('请输入您的手机号',1500);
                this.refs.phone.focus();
                return ;
            }
            // getCheckCode({type:3,phone:this.refs.phone.value})
            axios.post(lib.Api.memberURL+'/base/sms/sendCode',qs.stringify(
                {
                    type:3,phone:this.refs.phone.value
                }
            ), {
                headers: {
                //   'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                  'channel': 'Android'
                }
              }).then((res)=>{      
                console.log(res);
                if(res.data.code === 1 ){
                    Toast.info (res.data.errorMsg,1);
                    window.clearInterval(this.timer);                
                    this.setState({
                        ...this.state,                        
                        count:60,
                        checkCodeText :'获取验证码'
                    })
                }
            }).catch((err)=>{
                console.log(err);
                Toast.fail(err,1);                     
            })
            this.timer = window.setInterval(()=>{
                if(this.state.count <=0){
                    window.clearInterval(this.timer);
                    this.setState({
                        ...this.state,                        
                        count:60,
                        checkCodeText :'获取验证码'
                    })
                    return ;
                }
                this.setState({
                    ...this.state,                    
                    count: this.state.count -1,
                    checkCodeText:`重新获取${this.state.count}s`
                });
                console.log(this.state)
            },1000)
        }
    }
    handlerAgree(){
        if(!this.refs.agreeProtol.classList.contains('active') ){
            this.refs.agreeProtol.classList.add('active');                        
        }else{
            this.refs.agreeProtol.classList.remove('active');                                    
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
    link_to_protocal (e) {
        e.preventDefault();
        // registerProtocol()
        axios.get(lib.Api.bossURL+'/boss/setHelp/get?code=protocol_privacy_policy',{
            headers: {
                // 'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
              }
           }).then((res)=>{
            console.log(res);
            if(res.data.code === 1 ){
                Toast.info (res.data.errorMsg,1);
            }else if(res.data.code === 0){
                // 修复 Android 上点击穿透
                this.setState({
                    ...this.state,
                    modal: true,
                    userProcText:res.data.data    
                });        
            }
        }).catch((err)=>{
           Toast.fail('好像出错了喔...',2);            
        }) 
    }
    onClose() {
        this.setState({
            ...this.state,
            modal: false,
        });
    }
    onWrapTouchStart (e) {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        try{
            function closest(el, selector) {
                const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
                while (el) {
                  if (matchesSelector.call(el, selector)) {
                    return el;
                  }
                  el = el.parentElement;
                }
                return null;
            }
            const pNode = closest(e.target, '.am-modal-content');  
            if (!pNode) {
                e.preventDefault();
            }          
        }catch(err){}
       
    }
    closeModal(){
        this.setState({
            ...this.state,
            modal: false
        });    
    }
    handerLogin(){//登录
        this.props.history.push('/login')
    }
    render (){
        let text = '下一步',loginText  =  '登录',
        style = {width:'90%',background: "#D30000",color:'#fff'},
        checkCodeStyleSheet = {display:'inline-block',background: "#D30000",width:'100px',color:'#fff'};
        if (this.state.redirect) {  
            return <Redirect push to="/member/setPayFisrtTime" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数  
        } else{
            return (
                <div className='register-container'>
                    <Dialog closeModal = {this.closeModal.bind(this)}  isProc = {true} isShowToast = {this.state.modal}  toastText = {this.state.userProcText}></Dialog>                  
                    <Dialog  isShowToast = {this.state.isShowToast}  toastText = {this.state.toastText}></Dialog>
                    <ul>
                        <li>
                            <label htmlFor='accomment'>
                                <img src={require('../../../assets/img/user@2x.png')} alt=''/>
                            </label>
                            <input ref='accommender' type='text'  id='accomment' placeholder='请输入推荐人的手机号' maxLength={20}/>
                            <span>( 选填 )</span>
                        </li>
                        <li>
                            <label htmlFor='phone'>
                                    <img src={require('../../../assets/img/phone_icon@2x.png')} alt=''/>
                                </label>
                                <input ref='phone' type='text'  id='phone' placeholder='请输入您的手机号'  maxLength={20}/> 
                            </li>
                        <li> 
                        <label htmlFor='check_code'>
                                <img src={require('../../../assets/img/checkcode@2x.png')} alt=''/>
                            </label>
                            <input ref='checkcode' type='text'  id='check_code' placeholder='请输入验证码'  maxLength={10}/>
                            <button className = 'button' onClick = {this.changeCode.bind(this)} >{this.state.checkCodeText}</button>
                        </li>
                    </ul>
                    <Btn  handlerClick = {this.handerNext.bind(this)} styleSheet={style} text={text}></Btn>
                    <Btn  handlerClick = {this.handerLogin.bind(this)} styleSheet={style} text={loginText}></Btn>
                    <p className ='protocol'  >
                        <i onClick={this.handlerAgree.bind(this)}>
                            <img ref='agreeProtol' className='agree-protol' src={require('../../../assets/img/select@2x.png')} alt=''/>                        
                        </i>
                        <span  onClick={this.handlerAgree.bind(this)} className='_1'>阅读并同意</span>
                        <span onClick = {this.link_to_protocal.bind(this)} className = '_2'>【用户注册协议】</span>
                    </p>
                </div>
            )
        }      
       
    }
}