import React , {Component} from 'react'
import './my.less'
import axios from 'axios';
import {Link} from 'react-router-dom';
import HotRecommand from './hotRecommand';
const lib = require('../../utils/lib/lib.js');
var qs = require('qs');
export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:'',
            identity:'',
            refereeInfo:'',
            phone:'',
            maxValue:0
         }
    }
    componentDidMount(){
        var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
        TabBar.style.display='block';
        axios.get(lib.Api.memberURL+'/member/memberInfo/get',
        {
            headers: {
                'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                'channel': 'WEB'
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
        //获取诺米最大限度
        axios.get(lib.Api.bossURL+'/boss/setConfigure/get?code=member_personal_nuomi_limit_one_day',{
            headers:{
                'token':localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data.data){
                this.setState({
                    maxValue:res.data.data.value
                })
            }
        })
    }
    render (){
        return (
          <div>
             <div className="header">
              <img src={require('../../assets/img/组 116@2x.png')} style={{width:'100%',height:'170px'}}/>
              <div className="header-container">
                <span>我的</span>
                <img src={require('../../assets/img/设置@2x.png')} className="set"/>
                <Link to="member/msg"><img src={require('../../assets/img/消息提示@2x.png')}/></Link>
              </div>
              <div className="nuomi">
                <Link to="personinfo">
                <img src={this.state.data.headPortrait} style={{borderRadius:'100%',position:'relative',top:'5px'}}/>
                <div className="nuomiDetail">
                 <span>
                     {this.state.data.nickname}
                     <a><img src={require('../../assets/img/等级徽章@2x.png')}/>{this.state.identity}</a>
                 </span>
                 <h4>当日可得诺米最大限度：{this.state.maxValue}个</h4>
                </div>
                </Link>
              </div>
             </div>
             <div className="myOrder">
                <ul className="wealth">
                    <li>
                       <span>6666.666</span>
                       <h4>诺宝</h4>
                    </li>
                    <li>
                       <span>666.666</span>
                       <h4>诺豆</h4>
                    </li>
                    <li>
                       <span>666.666</span>
                       <h4>诺米</h4>
                    </li>
                    <li>
                       <span>6666.666</span>
                       <h4>功德金</h4>       
                    </li>
                </ul>
                <ul>
                    <li>
                        <img src={require('../../assets/img/待付款 @2x.png')}/>
                        <h4>待付款</h4>
                    </li>
                    <li>
                        <img src={require('../../assets/img/形状 542@2x.png')}/>
                        <h4>待发货</h4>
                    </li>
                    <li>
                        <img src={require('../../assets/img/待收货@2x.png')}/>
                        <h4>待收款</h4>
                    </li>
                    <li>
                        <img src={require('../../assets/img/我的订单@2x.png')}/>
                        <h4>我的订单</h4>
                    </li>
                </ul>
             </div>
             <HotRecommand/>
          </div>
        )
    }
}