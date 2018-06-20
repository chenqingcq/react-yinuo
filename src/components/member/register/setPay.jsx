import React , {Component} from 'react'
import './setPay.less'
import { InputItem, WhiteSpace ,Toast} from 'antd-mobile'
var qs = require('qs');
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
         setTitle('设置支付密码');
    }
    confirm(){
      var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;  
      if(this.refs.inputRef.state.value===''||this.refs.autoFocusInst.state.value===''){
          Toast.info('密码不能为空!',2)
      }else{
        if(reg.test(this.refs.autoFocusInst.state.value)){
           if(this.refs.inputRef.state.value===this.refs.autoFocusInst.state.value){
                window.localStorage.setItem('payPass',this.refs.autoFocusInst.state.value);
                setTimeout(()=>{
                   this.props.history.push('/member/registerByCode');
                })
           }else{
               Toast.info('两次输入不一致!',2)
           }
        }else{
            Toast.info('请输入8-20位包含英文和数字的密码!',2)
        }
      }
    }
   
    render (){

        return (
        <div className = 'setpay-container'>
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
          <span className="tip"><img src={require('../../../assets/img/jingshi_icon@2x.png')} style={{width:17,height:17}}/>密码由8-20位英文和数字的密码!</span><br/>
          <button className="confirm" onClick={this.confirm.bind(this)}>确定</button>
      </div>
        )
    }
}