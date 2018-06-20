import React, {Component} from 'react';
import Tab from '../../../pages/tab/tab';
import Button from '../../../pages/button/button';
import Dialog from '../../../pages/toast/toast';
import {Link} from 'react-router-dom';
import './addressMange.less'
import axios from 'axios';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
export default class Register extends Component {
    constructor(props){
        super(props);
        this.state= {
            isShow:true
        }
    }
    componentDidMount(){
        var params={
          'token':localStorage.getItem('token'),
        }
        axios.get(lib.Api.memberURL+'/member/memberAddress/getDefault',qs.stringify(params),
         {
            headers: {
              'channel': 'Android'
            }
         }
         ).then((res)=>{
           if(res.data.data===null){
               this.setState({
                 isShow:true
               })
           }else{
                this.setState({
                  isShow:false
                })
           }
        })
    }
    render(){
      return(
        <div className="container">
           <div className="img" style={{display:this.state.isShow}}>
            <Link to="addAddress"><img src={require('../../../assets/img/add.png')}/></Link><br/>
            <span>您还没有地址，请先添加地址</span>
           </div>
        </div>
      )
    }
}