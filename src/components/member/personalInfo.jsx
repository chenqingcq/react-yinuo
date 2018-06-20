import React , {Component} from 'react'
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
               this.setState({
                   'phone':this.state.refereeInfo.phone.substr(0,3)+'****'+this.state.refereeInfo.phone.substr(7)
               })
         }
        })
    }
    getSecret(){
        axios.post
    }
    logOut(){
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
    }
    render (){
        return (
          <div>
            <div className="personal">  
              <ul className="personalInfo">
                  <li>
                     <img src={{uri:this.state.data.headPortrait}}/>
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
                  <Link to="addressMange" style={{color:'#2b2b2b'}}> 收货地址
                      <span className="more">></span></Link>
                  </li>
                  <li>
                      隐私政策
                      <span className="more" onClick={this.getSecret.bind(this)}>></span>
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