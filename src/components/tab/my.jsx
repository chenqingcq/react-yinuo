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
        }
    }
    componentDidMount(){
        var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
        TabBar.style.display='block';
    }
    render (){
        return (
          <div>
             <div className="header">
              <img src={require('../../assets/img/组 116@2x.png')} style={{width:'100%',height:'170px'}}/>
              <div className="header-container">
                <span>我的</span>
                <img src={require('../../assets/img/设置@2x.png')} className="set"/>
                <img src={require('../../assets/img/消息提示@2x.png')}/>
              </div>
              <div className="nuomi">
                <Link to="personinfo">
                <img src={require('../../assets/img/组 102@2x.png')}/>
                <div className="nuomiDetail">
                 <span>
                     无敌金克丝呀
                     <a><img src={require('../../assets/img/等级徽章@2x.png')}/>诺米种子</a>
                 </span>
                 <h4>当日可得诺米最大限度：1000个</h4>
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