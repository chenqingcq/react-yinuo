import React, { Component } from 'react';
import { List, TextareaItem } from 'antd-mobile';
import axios from 'axios';
import './confirmOrder.less';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
export default class confirmOrder extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
       
        }
    }
    componentDidMount(){
     
    }

    render() {
        return (
          <div className="confirmContainer">
             <div className="address">
               <img src={require('../../../assets/img/地址25x28@2x.png')}/>
               <span>收货人：金克丝</span>
               <p>收货地址：广州市天河区林和西天河北365号寰城海航大厦35楼3503</p>
               <span className="addAddress" style={{display:'none'}}>请填写收货地址</span>
               <span className="selectAddress"><img src={require('../../../assets/img/qianjini_btn28@2x.png')}/></span>
             </div>
             <div className="orderItem">
               <div className="item">
                 <div className="itemHeader">
                   <img src={require('../../../assets/img/微信图片_20180410164036@2x.png')}/>
                   <span>素品优合旗舰店</span>
                 </div>
                 <div className="itemContainer">
                      <img src={require('../../../assets/img/微信图片_20180410164036@2x.png')}/>
                      <div className="info">
                        <h4>良品裙子喇叭袖矮碎花雪纺连衣裙短款小个子2018新款高腰女夏季</h4>
                        <span className="attr">颜色:姜黄色</span>
                        <span>￥<a>15.00</a> <a>×1</a></span>
                      </div>
                    <div className="method">
                      <ul>
                        <li>
                            <span className="liTitle">配送方式</span>
                            <span>快递:10.00元</span>
                        </li>
                        <li>
                            <span className="liTitle">获得诺米</span>
                            <span>0.001&nbsp;&nbsp;<img src={require('../../../assets/img/问号@2x.png')}/></span>
                        </li>
                        <li>
                           <TextareaItem
                                title="买家留言"
                                placeholder="选填"
                                data-seed="logId"
                                autoHeight
                                ref={el => this.customFocusInst = el}
                            />
                        </li>
                        <li>
                           <span>共一件商品&nbsp;&nbsp;<a>#D30000</a></span>
                        </li>
                      </ul>
                    </div>
                 </div>
               </div>
             </div>
             <div className="footer">
               <span>合计：<b style={{color:'#d30000',fontWeight:'normal'}}>¥45.00</b></span>
               <h3>
                   <img src={require('../../../assets/img/nuomi@2x.png')}/>
                   +0.4567个
               </h3>
               <a>提交订单</a>
             </div>
          </div>
        )
    }
}