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
       axios.get(lib.Api.memberURL+'/member/register/registerProtocol',{
        headers: {
            // 'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
          }
       }).then((res)=>{
           console.log(res)
           if(res.data.data && res.data.code ==0){
              this.refs.inner.innerHTML=res.data.data
           }
       })
    }
  
    render (){
        return (
          <div className="article" style={{background:'#f4f4f4',width:'100%',height:'100%',overflow:'scroll'}}>
            <div ref="inner" style={{width:'90%',position:'relative',left:'5%'}}>
            </div>
          </div>
        )
    }
}