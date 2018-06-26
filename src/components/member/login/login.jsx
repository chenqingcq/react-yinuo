import React, { Component } from 'react';
import Button from '../../../pages/button/button';
import {Link} from 'react-router-dom';
import './login.less';
import axios from 'axios';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
export default class Login extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowBtn: {
                pswFlag: false,
                userFlag: false
            },
            isShow:false,
            text:'',
            count:0,
            secondCount:60,
            btnText:'获取动态密码',
            timer:'',
        }
    }
    componentDidMount(){
        var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
        TabBar.style.display='none';
        var personinfo = localStorage.getItem('personinfo');
        if(personinfo){
            this.props.history.push('index');
        }
    }
    handlerOperate() {
        console.log('register')
    }
    handClick() {
        var exp =/^[1][3,4,5,7,8][0-9]{9}$/;  
        if(exp.test(this.refs.username.value)){
            this.setState({
                isShow:false
            })
            if(this.refs.btnCode.style.display==='none'){
                let Param={
                    'phone':this.refs.username.value,
                    'password':this.refs.password.value
            }
            axios.post(lib.Api.memberURL+'/member/login/loginByPassword',
            qs.stringify(Param),
            {
                headers: {
                    'channel': 'Android'
                }
            }
            ).then((res)=>{  
                   if(res.data.code===1){
                     this.setState({
                        text:'账号或密码错误',
                        isShow: true,
                        count: this.state.count+1
                     })
                     if(this.state.count>=3){
                        this.setState({
                          text:'你已经三次登录失败，请明天再试',
                       })
                     }
                   } else if(res.data.code===30201){
                      this.setState({
                        text:'为了您的账号安全，请用手机动态码登录并重新设置密码',
                        isShow: true,
                      })   
                   } else if(res.data.code===0){
                       this.setState({
                        text:'登录成功',
                        isShow: true,
                      })
                      if(res.data.data!==null){
                        localStorage.setItem('token',JSON.stringify(res.data.data.token))
                        localStorage.setItem('personinfo',JSON.stringify(res.data.data.memberInfo))
                      }
                      localStorage.setItem('phone',this.refs.username.value)
                      localStorage.setItem('code',this.refs.password.value)
                      setTimeout(()=>{
                       this.props.history.push('index');
                      })
                   } else if(res.data.code===30200){
                       this.refs.container.style.display='block';
                       this.refs.inner.style.display='block'
                   }
                })
            }else{
                var param ={
                    'phone': this.refs.username.value,
                    'verificationCode':this.refs.password.value,
                    'type':0
                }
                axios.post(lib.Api.memberURL+'/base/sms/verifyCode',qs.stringify(param)).then((res)=>{
                    console.log(res)
                    if(res.data.code===1){
                        this.setState({
                            text:'验证码错误',
                            isShow: true,
                         })
                    }else if(res.data.code===30201){
                        this.setState({
                            text:'为了您的账号安全，请用手机动态码登录并重新设置密码',
                            isShow: true,
                          })   
                        setTimeout(()=>{
                            this.props.history.push('setPwd');
                        },500)
                    }else if(res.data.code===30200){
                        this.refs.container.style.display='block';
                        this.refs.inner.style.display='block'
                    }else if(res.data.code===0){
                        var params = {
                            'phone': this.refs.username.value,
                            'verificationCode':this.refs.password.value,
                        }
                        axios.post(lib.Api.memberURL+'/member/login/loginByVerCode',qs.stringify(params),{
                            headers:{
                                'channel':'Android'
                            }
                        }).then((res)=>{
                            if(res.data.code===0){
                                localStorage.setItem('phone',this.refs.username.value)
                                localStorage.setItem('code',this.refs.password.value)
                                if(res.data.data!==null){
                                    localStorage.setItem('token',JSON.stringify(res.data.data.token))
                                    localStorage.setItem('personinfo',JSON.stringify(res.data.data.memberInfo))
                                }
                                this.setState({
                                    text:'登录成功',
                                    isShow: true,
                                  })   
                                setTimeout(()=>{
                                    this.props.history.push('index');
                                },1000)
                            }
                        })
                    }
                })
            }
        
        }else{
            this.setState({
                text:'手机号位数是11位',
                isShow: true
            })
        }

       //检测手机账号
       //检测输入密码
    }
          
    codeClick(){
        this.refs.password.placeholder ='请输入动态密码';
        this.refs.forgetPwd.innerHTML ='使用一诺账号登录';
        this.refs.forgetPwd.style.display='block';
        this.refs.btnCode.style.display ='block';
        this.refs.forgetPwd.nextElementSibling.style.display ='none'
    }
    login(){
        if(this.refs.forgetPwd.innerHTML==='使用一诺账号登录'){
            this.refs.forgetPwd.style.display ='none';
            this.refs.btnCode.style.display ='none';
            this.refs.forgetPwd.nextElementSibling.style.display ='block';
        }
    }
    loginByCode(){
        clearInterval(this.state.timer)
        var exp =/^[1][3,4,5,7,8][0-9]{9}$/;  
        if(exp.test(this.refs.username.value)){
        this.setState({
            timer:setInterval(()=>{
                this.setState({
                    secondCount:this.state.secondCount-1,
                    btnText:'重新获取'+this.state.secondCount+'s'
                })
                if(this.state.secondCount<=0){
                    clearInterval(this.state.timer)
                    this.setState({
                        secondCount:60, 
                        btnText:'获取动态密码'
                    })
                }
           },1000) 
        })
        if(this.state.secondCount<=0){
            clearInterval(this.state.timer)
            this.setState({
                secondCount:60,
                btnText:'获取动态密码'
            })
        }
        var param ={
            'type':0,
            'phone':this.refs.username.value
        }
        if(this.state.secondCount>=59){
            axios.post(lib.Api.memberURL+'/base/sms/sendCode',qs.stringify(param)).then((res)=>{
                console.log(res)
                if(res.data.code!==0){
                    clearInterval(this.state.timer)
                    this.setState({
                        text:'您的手机号未注册,请注册',
                        isShow: true,
                        secondCount:60,
                        btnText:'获取动态密码'
                    })
                }
            })
        }    
    }
}

    handlerUsername(e) {
        e.target.value = e.target.value.trim();
        console.log(e.target.value);
        if (e.target.value.length) {
            this.setState({
                ...this.state,
                username :e.target.value,
                isShowBtn: {
                    ...this.state.isShowBtn,
                    userFlag: true
                },
                isShow:false
            })
            this.refs.usernameCloseBtn.classList.add('_active');
        } else {
            this.setState({
                ...this.state,
                username :'',
                isShowBtn: {
                    ...this.state.isShowBtn,
                    userFlag: false
                }
            })
            this.refs.usernameCloseBtn.classList.remove('_active');
        }
        this.handlerBtnShow();
    }
    handlerClearUsername() {
        this.refs.username.value = '';
        this.refs.usernameCloseBtn.classList.remove('_active');
        this.setState({
            ...this.state,
            username:'',
            isShowBtn: {
                ...this.state.isShowBtn,
                userFlag: false
            }
        })
    }
    handlerPassword(e) {
        e.target.value = e.target.value.trim();
        console.log(e.target.value);
        if (e.target.value.length) {
            this.setState({
                ...this.state,
                password:e.target.value,
                isShowBtn: {
                    ...this.state.isShowBtn,
                    pswFlag: true
                }
            })
            this.refs.passwordCloseBtn.classList.add('_active');
        } else {
            this.setState({
                ...this.state,
                password:'',
                isShowBtn: {
                    ...this.state.isShowBtn,
                    pswFlag: false
                }
            })
            this.refs.passwordCloseBtn.classList.remove('_active');
        }
    }
    closeInner(){
       this.refs.container.style.display='none'
    }
    handlerBtnShow() {
        // console.log(this.state.isShowBtn)
    }
    handlerClearPassword() {
        this.refs.password.value = '';
        this.refs.passwordCloseBtn.classList.remove('_active');
        this.setState({
            ...this.state,
            password:'',
            isShowBtn: {
                ...this.state.isShowBtn,
                pswFlag: false
            }
        })
    }
    render() {
        let text = '登录';
        return (
            <div className='login-container'>
               <div className="inner" ref="inner">
                <section>
                    <div className='logo'>
                        <img src={require('../../../assets/img/logo@2x.png')} alt='' />
                    </div>
                    <span ref="tip" className="tipMessage" style={{display:this.state.isShow?'block':'none'}}>{this.state.text}</span>
                    <div className='login-panel'>
                        <p>
                            <label htmlFor='username'>
                                <img src={require('../../../assets/img/phone_icon@2x.png')} alt='' />
                            </label>
                            <input autoFocus ='autoFocus' ref='username' id='username' onChange={this.handlerUsername.bind(this)} type="text" placeholder='请输入手机号码' maxLength={11} />
                            <img ref='usernameCloseBtn' onClick={this.handlerClearUsername.bind(this)} className='close' src={require('../../../assets/img/close_btn@2x.png')} alt="" />
                        </p>
                        <p>
                            <label htmlFor='password'>
                                <img src={require('../../../assets/img/lock_icon@2x.png')} alt='' />
                            </label>
                            <input ref='password' onChange={this.handlerPassword.bind(this)} id='password' type="password" placeholder='请输入用户密码' maxLength={20} />
                            <button style={{height:35,position:'relative',right:10,top:-8,backgroundColor:'#D30000',color:'#fff',fontSzie:15,width:'30%',display:'none'}} ref='btnCode' className="activeCode" onClick={this.loginByCode.bind(this)}>{this.state.btnText}</button>
                            <img ref='passwordCloseBtn' onClick={this.handlerClearPassword.bind(this)} className='close' src={require('../../../assets/img/close_btn@2x.png')} alt="" />
                        </p>
                    </div>
                </section>
                <Button handlerClick={(this.state.isShowBtn.userFlag && this.state.isShowBtn.pswFlag)?this.handClick.bind(this):function(){}} styleSheet={{ color: '#fff',width:'90%', background: (this.state.isShowBtn.userFlag && this.state.isShowBtn.pswFlag) ? "#D30000" : '#ddd' }} text={text} />
                <Link to='member/register' className='reg'>注册</Link>
                <span ref="forgetPwd" className="forget" onClick={this.login.bind(this)} style={{display:'none'}}>忘记密码?</span><p className='code_login' onClick={this.codeClick.bind(this)}>使用手机动态码登录</p>
                </div>
                <div className="continer"  ref="container" style={{display:'none'}}>
                  <p>
                    <span>账号已被冻结，请联系客服</span><br/>
                    <span className="service">客服：4000998919</span><br/>
                    <a href="tel:4000998919"><img src={require('../../../assets/img/contact@2x.png')} style={{width:24,height:24}}/>&nbsp;联系客服</a>
                  </p>
                  <span className="img"><img src={require('../../../assets/img/close_btn@2x.png')} style={{width:30,height:30,position:'absolute',top:350,left:'45%'}} onClick={this.closeInner.bind(this)}/></span>
                </div>
            </div>
        )
    }
}