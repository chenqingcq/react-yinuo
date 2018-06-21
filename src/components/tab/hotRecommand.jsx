import React , {Component} from 'react';
import {  ListView, Button} from 'antd-mobile';
import Luo from 'iscroll-luo';
import axios from 'axios';
const lib = require('../../utils/lib/lib.js');
var qs = require('qs');
export default class hotRecommand extends Component {
  constructor(props){
    super(props);
    this.state = {
       hotSale:[],
       num:0,
       noMore:false
    }
  }
  componentDidMount(){
    axios.get(lib.Api.goodsURL+'/goods/goodsInfo/recommend/listGoods?pageNum=1&pageSize=10',{
      headers: {
        'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
      }
    }).then((res)=>{
      console.log(res.data.data.rows)
        if(res.data.data.rows){
             this.setState({
                hotSale:res.data.data.rows,
                num:this.state.num+1
             })
        }
    })
  }
  loadMoreGoods(){
    var num = this.state.num;
    axios.get(lib.Api.goodsURL+'/goods/goodsInfo/recommend/listGoods?pageNum='+(num+1)+'&pageSize=10',{
      headers: {
        'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
      }
    }).then((res)=>{
      console.log(res.data.data.rows)
        if(res.data.data.rows){
             this.setState({
                hotSale:this.state.hotSale.concat(res.data.data.rows),
                num:this.state.num+1
             })
        }
    })
  }
  render (){
    return(
       <div>
          <div className="hotRecommand">
              <img src={require('../../assets/img/组 115@2x.png')}/>
              <h3>热销推荐</h3>
              <h4>Hot sale recommendation</h4>
              <div className="itemList">
              <div style={{ position: 'relative', height: '100vh' }}>
                    <Luo
                      id='id'
                      onUp={() => this.loadMoreGoods()}
                    >
                   <ul>
                   {this.state.hotSale.map((val,index)=>{
                     return(
                      <li key={val.id}>
                      <img src={val.coverPic}/>
                      <p className="goodsName">
                        {val.name?(val.name.length>=15?val.name.substr(0,15)+'...':val.name):''}
                        <span>月销量：<a>{val.saleMonth}</a></span>
                      </p>
                      <p className="goodsPrice">
                        <span>￥{val.price}</span>
                        <a style={{display:val.marketPrice===0?'none':'block'}}>￥{val.marketPrice}</a>
                      </p>
                      <p className="Deliver">
                        <span><img src={require('../../assets/img/nuomi@2x.png')} style={{width:9,height:14}}/>+{val.nuomi.toFixed(2)}</span>
                        <a style={{display:val.isPostageFree?'none':'block'}}>快递：12.00元</a>
                        <a style={{fontSize:'9px',color:'#D30000',border:'1px solid #D30000',borderRadius:'5px',display:val.isPostageFree?'block':'none'}}>包邮</a>
                      </p>
                    </li>
                   )})
                   }
                 </ul>
                 </Luo>
              </div>
          </div>
       </div>
       </div>
     )
  }
}
