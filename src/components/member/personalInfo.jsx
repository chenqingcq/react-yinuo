import React , {Component} from 'react'
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import './personalInfo.less'
import axios from 'axios';
import {Link} from 'react-router-dom';
const lib = require('../../utils/lib/lib.js');
var qs = require('qs');
export default class PersonalInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
           data:'',
           identity:'',
           refereeInfo:'',
           phone:''
        }
    }
    componentDidMount(){
        var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
        TabBar.style.display='none';
        axios.get(lib.Api.memberURL+'/member/memberInfo/get',
        {
            headers: {
                'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                'channel': 'Android'
            }
        }).then((res)=>{
            console.log(res)
            if(res.data.data!==null){
                this.setState({
                    data:res.data.data.memberInfoVo,
                    refereeInfo:res.data.data.refereeMemberInfoVo
                })
                if(this.state.data.identity==='MEMBER'){
                    this.setState({
                        'identity':'诺米种子'
                    })
                }else if(this.state.data.identity==='PERSONAL_SHOP'){
                    this.setState({
                        'identity':'诺米使者'
                    })
                }else if(this.state.data.identity==='ENTERPRISE_SHOP'){
                    this.setState({
                        'identity':'诺米大使'
                })
            }
               if(this.state.refereeInfo){
                this.setState({
                    'phone':this.state.refereeInfo.phone.substr(0,3)+'****'+this.state.refereeInfo.phone.substr(7)
                })
               }
         }
        })      
    }
    getSecret(){
   
    }
    logOut(){
        Modal.alert('', '您确定要退出吗', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
              text: '确定',
              onPress: () =>
                new Promise((resolve) => {
                  Toast.info('退出成功', 1);
                  setTimeout(resolve, 1000);
                  axios.post(lib.Api.memberURL+'/member/login/logout',
                    {
                        headers: {
                            'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                            'channel': 'Android'
                        }
                    }).then((res)=>{
                        if(res.data.code===0){
                            localStorage.removeItem('personinfo');
                            localStorage.removeItem('phone');
                            localStorage.removeItem('token');
                            setTimeout(()=>{
                                this.props.history.push('login')
                            },500)
                        }
                    })
                }),
            },
          ])
       
    }
    render (){
        return (
          <div>
            <div className="personal">  
              <ul className="personalInfo">
                  <li>
                     <img src={this.state.data.headPortrait} style={{width:'63px',height:'63px',borderRadius:'100%',position:'relative',top:'16px'}}/>
                     <span>{this.state.data.nickname}</span>
                     <span className="more">></span>
                  </li>
                  <li>
                      会员等级
                      <span>{this.state.identity}</span>
                  </li>
                  <li>
                      推荐人
                      <span>{this.state.phone}</span>
                  </li>
                  <li>
                  <Link to="member/addressManage" style={{color:'#2b2b2b'}}> 收货地址
                      <span className="more">></span></Link>
                  </li>
                  <li>
                  <Link to="article" style={{color:'#2b2b2b'}}>隐私政策
                      <span className="more" onClick={this.getSecret.bind(this)}>></span></Link>
                  </li>
                  <li onClick={this.logOut.bind(this)}>
                      退出登录
                  </li>
              </ul>
            </div>
          </div>
        )
    }
}