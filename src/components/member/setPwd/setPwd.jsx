import React , {Component} from 'react'
import './setPwd.less'
import { InputItem, WhiteSpace } from 'antd-mobile'
import {Link} from 'react-router-dom'
import axios from 'axios';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
export default class setPwd extends Component {
    constructor(props){
        super(props);
        this.state = {
          text:''
        }
    }
    componentDidMount(){
      var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
      TabBar.style.display='none';
    }
    confirm(){
      var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;  
      if(this.refs.inputRef.state.value===''||this.refs.autoFocusInst.state.value===''){
           this.setState({
               text:'密码不能为空'
           })
      }else{
        if(reg.test(this.refs.autoFocusInst.state.value)){
           if(this.refs.inputRef.state.value===this.refs.autoFocusInst.state.value){
                localStorage.setItem('loginPwd',this.refs.autoFocusInst.state.value);
                setTimeout(()=>{
                   this.props.history.push('setPay')
                })
           }else{
            this.setState({
              text:'两次输入不一致！'
            })
           }
        }else{
          this.setState({
            text:'请输入8-20位包含英文和数字的密码！'
        })
        }
      }
    }
   
    render (){

        return (
        <div>
          <InputItem
            clear
            placeholder="请输入8-20包含英文和数字的密码"
            ref="autoFocusInst"
            type="password"
          >设置密码</InputItem>
          <InputItem
            clear
            placeholder="请再次确认密码"
            ref="inputRef"
            type="password"
          >确认密码</InputItem>
          <span className="tip"><img src={require('../../../assets/img/jingshi_icon@2x.png')} style={{width:17,height:17}}/>密码由8-20位英文和数字的密码！</span><br/>
          <span className="tipMsg">{this.state.text}</span>
          <button className="confirm" onClick={this.confirm.bind(this)}>确定</button>
      </div>
        )
    }
}