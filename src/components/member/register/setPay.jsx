import React , {Component} from 'react'
import './setPay.less'
import { InputItem, WhiteSpace ,Toast} from 'antd-mobile';
import  {Api} from  '../../../utils/lib/lib.js';
import axios from 'axios';
import qs from 'qs'
export default class setPay extends Component {
    constructor(props){
        super(props);
        this.state = {
          text:''
        }
    }
    componentDidMount(){
        function setTitle(val){
            document.title = val;
        }   
         setTitle('注册');
    }
    confirm(){
      var reg = /^\d{6}$/;  
      if(this.refs.inputRef.state.value===''||this.refs.autoFocusInst.state.value===''){
          Toast.info('密码不能为空!',2)
      }else{
        if(reg.test(this.refs.autoFocusInst.state.value)){
           if(this.refs.inputRef.state.value===this.refs.autoFocusInst.state.value){
                window.localStorage.setItem('payPass',this.refs.autoFocusInst.state.value);
                this.register();
           }else{
               Toast.info('两次输入不一致!',2)
           }
        }else{
            Toast.info('请输入6位数字的密码!',2)
        }
      }
    }
   register(){
    let phone = window.localStorage.getItem('phone');
    let refereePhone = window.localStorage.getItem('refereePhone');
    let code = window.localStorage.getItem('code');
    let payPass = window.localStorage.getItem('payPass');
    let loginPass = window.localStorage.getItem('loginPwd');
    let data = !!refereePhone?
     Object.assign({},{phone:phone,loginPass:loginPass,verificationCode:code,payPass:payPass,refereePhone:refereePhone}):
     Object.assign({},{phone:phone,loginPass:loginPass,verificationCode:code,payPass:payPass});   
    console.log(data);  
    axios.post(Api.memberURL+ '/member/register/register',
        qs.stringify(data)       
    ,{
            headers:{
                'channel': 'WEB'                    
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
            }
        }).catch((err)=>{
            console.log(err);
    }) 
}
    render (){
        return (
                <div className = 'setpay-container'>
                <InputItem
                    clear
                    placeholder="请输入6位数字的密码"
                    ref="autoFocusInst"
                    type="password"
                >设置密码</InputItem>
                <InputItem
                    clear
                    placeholder="请确认支付密码"
                    ref="inputRef"
                    type="password"
                >确认密码</InputItem>
                <span className="tip"><img src={require('../../../assets/img/jingshi_icon@2x.png')} style={{width:17,height:17}}/>支付密码由6位数字组成</span><br/>
                <button className="confirm" onClick={this.confirm.bind(this)}>确定</button>
            </div>
        )
    }
}