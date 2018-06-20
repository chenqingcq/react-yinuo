import React , {Component} from 'react'
import './setPay.less'
import { InputItem, WhiteSpace } from 'antd-mobile'
import {Link} from 'react-router-dom'
import axios from 'axios';
const lib = require('../../utils/lib/lib.js');
var qs = require('qs');
export default class setPwd extends Component {
    constructor(props){
        super(props);
        this.state = {
             text:'',
             isShow:false
        }
    }
    componentDidMount(){
        console.log(this.$http);
    }
    confirm(){
        var exp = /^[0-9]{6}$/;
        console.log(this.refs.inputRef)
        if(this.refs.inputRef.state.value===''||this.refs.autoFocusInst.state.value===''){
            this.setState({
                text:'密码不能为空',
                isShow:true
            })
       }else{
         if(exp.test(this.refs.autoFocusInst.state.value)){
            if(this.refs.inputRef.state.value===this.refs.autoFocusInst.state.value){
                 var loginPwd=localStorage.getItem('loginPwd');
                 var code = localStorage.getItem('code');
                 var phone = localStorage.getItem('phone')
                 var params ={
                     'phone':phone,
                     'verificationCode':code,
                     'loginPass':loginPwd,
                     'payPass':this.refs.autoFocusInst.state.value
                 }
                 axios.post(lib.Api.memberURL+'/member/register/forceChangePass',qs.stringify(params)).then((res)=>{
                     if(res.data.code===1){
                        this.setState({
                            text:'验证码输入错误，请重新获取！',
                            isShow:true
                          })
                     }else if(res.data.code===0){
                        this.setState({
                            text:'修改成功',
                            isShow:true
                          })
                        this.props.history.push('login')
                     }
                 })
            }else{
             this.setState({
               text:'两次输入不一致！',
               isShow:true
             })
            }
         }else{
           this.setState({
             text:'请输入6位数字的密码！',
             isShow:true
         })
         }
       }
    }
    render (){

        return (
        <div>
          <InputItem
            clear
            placeholder="请输入6位支付密码"
            ref='autoFocusInst'
            type="password"
          >设置密码</InputItem>
          <InputItem
            clear
            placeholder="请确实支付密码"
            ref='inputRef'
            type="password"
          >确认密码</InputItem>
          <span className="tip"><img src={require('../../assets/img/jingshi_icon@2x.png')} style={{width:17,height:17}}/>支付密码由6位数字组成</span><br/>
          <span className="tipMsg" style={{display:this.state.isShow}}>{this.state.text}</span>
          <button className="confirm" onClick={this.confirm.bind(this)}>确定</button>
      </div>
        )
    }
}