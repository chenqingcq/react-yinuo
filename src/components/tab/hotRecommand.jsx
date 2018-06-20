import React , {Component} from 'react';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
export default class hotRecommand extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    }
  }
  render (){
    return(
       <div>
          <div className="hotRecommand">
              <img src={require('../../assets/img/组 115@2x.png')}/>
              <h3>热销推荐</h3>
              <h4>Hot sale recommendation</h4>
              <div className="itemList">
                 <ul>
                   <li>
                     <img src={require('../../assets/img/卡片默认加载图片@2x.png')}/>
                     <p className="goodsName">
                       经典宽松拼色一字领女士毛呢
                       <span>月销量：<a>7435</a></span>
                     </p>
                     <p className="goodsPrice">
                       <span>￥223.00</span>
                       <a>￥912.00</a>
                     </p>
                     <p className="Deliver">
                       <span><img src={require('../../assets/img/nuomi@2x.png')} style={{width:9,height:14}}/>+0.5643</span>
                       <a>快递：12.00元</a>
                       {/* <img /> */}
                     </p>
                   </li>
                   <li>
                   <img src={require('../../assets/img/卡片默认加载图片@2x.png')}/>
                     <p className="goodsName">
                       经典宽松拼色一字领女士毛呢
                       <span>月销量：<a>7435</a></span>
                     </p>
                     <p className="goodsPrice">
                       <span>￥223.00</span>
                       <a>￥912.00</a>
                     </p>
                     <p className="Deliver">
                       <span><img src={require('../../assets/img/nuomi@2x.png')} style={{width:9,height:14}}/>+0.5643</span>
                       <a>快递：12.00元</a>
                       {/* <img /> */}
                     </p>
                   </li>
                   <li>
                   <img src={require('../../assets/img/卡片默认加载图片@2x.png')}/>
                     <p className="goodsName">
                       经典宽松拼色一字领女士毛呢
                       <span>月销量：<a>7435</a></span>
                     </p>
                     <p className="goodsPrice">
                       <span>￥223.00</span>
                       <a>￥912.00</a>
                     </p>
                     <p className="Deliver">
                       <span><img src={require('../../assets/img/nuomi@2x.png')} style={{width:9,height:14}}/>+0.5643</span>
                       <a>快递：12.00元</a>
                       {/* <img /> */}
                     </p>
                   </li>
                   <li>
                   <img src={require('../../assets/img/卡片默认加载图片@2x.png')}/>
                     <p className="goodsName">
                       经典宽松拼色一字领女士毛呢
                       <span>月销量：<a>7435</a></span>
                     </p>
                     <p className="goodsPrice">
                       <span>￥223.00</span>
                       <a>￥912.00</a>
                     </p>
                     <p className="Deliver">
                       <span><img src={require('../../assets/img/nuomi@2x.png')} style={{width:9,height:14}}/>+0.5643</span>
                       <a>快递：12.00元</a>
                       {/* <img /> */}
                     </p>
                   </li>
                 </ul>
              </div>
          </div>
       </div>
      )
     } 
  }
