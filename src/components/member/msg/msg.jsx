import React, { Component } from 'react';
import axios from 'axios';
import Luo from 'iscroll-luo';
import './msg.less';
import { Tabs, WhiteSpace } from 'antd-mobile';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
export default class msg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs:[
                { title: '全部' },
                { title: '资产' },
                { title: '通知' },
              ],
              num:0,
              msgList:[]
        }
    }
    componentDidMount(){
        var TabBar =document.querySelector('.am-tab-bar');
        TabBar.style.display='none';
        this.loadData(lib.Api.bossURL+'/jpush/record/list?pageNum=1&pageSize=10');
    }
    loadData(url){
        axios.get(url,{
            headers: {
                'token': localStorage.getItem('token').replace("\"","").replace("\"","")
            }
        }).then((res)=>{
            if(res.data.data.rows){
                this.setState({
                    msgList:res.data.data.rows
                })
            }
        })
    }
    loadMoreGoods(){
        axios.get(lib.Api.bossURL+'/jpush/record/list?pageNum='+this.state.num+'&pageSize=10',{
            headers: {
                'token': localStorage.getItem('token').replace("\"","").replace("\"","")
            }
        }).then((res)=>{
            if(res.data.data.rows){
                this.setState({
                    msgList:this.state.msgList.concat(res.data.data.rows),
                    num:this.state.num+1
                })
            }
        })
    }
    formatDate(time){
        var date = new Date(time);
        var year = date.getFullYear().toString().substr(2),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate();
        var newTime = year + '/' +
                    month + '/' +
                    day
        return newTime;    
    }     
    changeTab(e){
      if(e.title=='资产'||e.title=='通知'){
            axios.get(lib.Api.bossURL+'/jpush/record/listCategory',{
                headers: {
                    'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                    'channel':'WEB'
                }
            }).then((res)=>{
                if(res.data.data){
                   res.data.data.map((val,index)=>{
                    if(val.name==='资产类'&&e.title=='资产'){
                        var resouceId =val.id;
                        this.loadData(lib.Api.bossURL+'/jpush/record/list?categoryId='+resouceId+'&pageNum=1&pageSize=10');
                    }else if(val.name==='通知类'&&e.title=='通知'){
                        var noticeId = val.id;
                        this.loadData(lib.Api.bossURL+'/jpush/record/list?categoryId='+noticeId+'&pageNum=1&pageSize=10');
                    }
                    console.log(this.state.msgList)
                })
               
              }
            })
      }else{
          this.loadData(lib.Api.bossURL+'/jpush/record/list?pageNum=1&pageSize=10');
      }
  
      
    }
  
  render() {
    return (
      <div>
          <div className="tabbarSelect">
            <Tabs tabs={this.state.tabs}
                initalPage={'t2'}
                tabBarInactiveTextColor="#2b2b2b"
                tabBarActiveTextColor="#D30000"
                tabBarUnderlineStyle={{border:'1px solid #D30000',width:'20%','marginLeft':'7%'}}
                tabBarTextStyle={{fontSize:'15px'}}
                onChange={this.changeTab.bind(this)}
            /> 
             <Luo
                      id='id'
                      onUp={() => this.loadMoreGoods()}
                    >
              <ul>
                { this.state.msgList.map((val,index)=>{
                return(
                    <li key={index}>
                        <h3>{val.title}<span>{this.formatDate(val.gmtCreate)}</span></h3>
                        <span className='title'>{val.message}</span>
                    </li>
                )   
            })}
              </ul>
              </Luo>
          </div>
      </div>
    )
    }
}