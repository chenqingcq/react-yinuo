import React , {Component} from 'react'
import axios from 'axios';
const lib = require('../../utils/lib/lib.js');
var qs = require('qs');
export default class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
       }
    }
    componentDidMount(){
       var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
       TabBar.style.display='none';
       axios.get(lib.Api.bossURL+'/boss/setHelp/get?code=protocol_privacy_policy',{
        headers: {
            'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
          }
       }).then((res)=>{
           if(res.data.data.context){
              this.refs.inner.innerHTML=res.data.data.context;
           }
       })
    }
  
    render (){
        return (
          <div className="article" style={{background:'#f4f4f4',width:'100%'}}>
            <div ref="inner" style={{width:'90%',position:'relative',left:'5%'}}>
            </div>
          </div>
        )
    }
}