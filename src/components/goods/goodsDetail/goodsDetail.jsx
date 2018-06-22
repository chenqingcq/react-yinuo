import React from 'react';
import axios from 'axios';
import qs from 'qs'
import { Carousel, WingBlank } from 'antd-mobile';


import './goodsDetail.less'
// import Tab from '../tab/tab'
const lib = require('../../../utils/lib/lib.js');

class GoodsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            carouselPics:[],
            imgHeight: 176,
            goodsName:'',
            shopDeliveryAddress:'',//收货地址
            sale:0,//销售量,
            nuomi:0 ,//糯米数
            price:0 ,//销售价
            postage:0//快递费
        }
    }
    componentWillMount(){   
        let id = window.sessionStorage.getItem('goodsId') || '' 
        axios.get(`${lib.Api.goodsURL}/goods/goodsInfo/detail/get?id=${id}`, {
            headers: {
              'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
              'channel': 'Android'
            }
          }).then((res)=>{
              console.log(res)
              if(res.data.code === 0 ){
                  this.setState({
                      ...this.state,
                      carouselPics:[...res.data.data.carouselPics],
                      goodsName:res.data.data.name,
                      goodsInfo:res.data.data,
                      shopDeliveryAddress:res.data.data.shopDeliveryAddress,
                      sale:res.data.data.sale,
                      nuomi:res.data.data.nuomi[0],
                      price:res.data.data.price[0],
                      postage:res.data.data.postage
                  })
                  setTimeout(()=>{
                    console.log(this.state)
                })
              }
          }).catch((err)=>{
              console.log(err)
          });
         
    }
    goodsCollect(e){
        // if(e.)
    }
    render(){
        return (
            <div className='goods-container'>
                <div className='carousel-container'>
                    <div className ='carousel-panel'>            
                     <div className='goods-carousel'>
                        <div className ='banner-logo'>
                            <span>
                                <img src={require('../../../assets/img/backicon@2x.png')} alt=''/>
                            </span>
                            <span className ='home'>
                                <img src={require('../../../assets/img/home@2x.png')} alt=''/>                                
                            </span>
                            <span>
                                <img src={require('../../../assets/img/message@2x.png')} alt=''/>                                
                            </span>
                        </div>
                        <WingBlank>
                            <Carousel
                            autoplay={true}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                            >
                            {this.state.carouselPics.map(val => (                  
                                <img   
                                    style={
                                        {
                                            width:'100%',
                                            height:this.state.imgHeight
                                        }
                                    }
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 375 });
                                     }}
                                   key = {val}  
                                   src={val} 
                                   alt=''/>
                            ))}         
                            </Carousel>
                            </WingBlank>
                         </div>
                     <div className='goods-intr'>
                            <div className='goods-name'>
                                {this.state.goodsName}
                            </div>
                            <div className='goods-price'>
                                <p className='pre-now-price'>
                                    <span>￥{this.state.price}</span>
                                    <span>￥2323</span>
                                </p>
                                <p className='month-out'>
                                    <img src = {require('../../../assets/img/nuomi@2x.png')} alt=''/>                                                
                                    <span>{this.state.nuomi}</span>
                                    <span className='count' >
                                        月销量:<span>{this.state.sale}</span>
                                    </span>
                                </p>
                                <p className ='address'>
                                    <span>快递:<i>{this.state.postage}</i></span>
                                    <span>{this.state.shopDeliveryAddress}</span>
                                </p>
                            </div>
                            <div className='goods-address'></div>
                     </div>
                     <div className='goods-params'>
                          <ul>
                              <li>
                                  <span>服务</span>
                                  <span>10天内发货</span>
                              </li>
                              <li>
                                    <div className='param'>
                                        参数
                                    </div> 
                                    <div className='style'>
                                       <div>
                                            <span>风格</span>    
                                            <span>廓形</span>     
                                        </div>  
                                        <img src ={require('../../../assets/img/arrow_right_btn24@2x.png')} alt=''/>
                                    </div>                  
                                </li>
                          </ul>
                    </div>
               
                    </div>
                 </div>
                <div className='goods-tab-container'>
                    <div className ='left'>
                        <span className ='person-service'>
                            <img src = {require('../../../assets/img/pserson-service@2x.png')} alt=''/>
                        </span>
                        <span  className ='collect' onClick={this.goodsCollect.bind(this)}>
                            <img  src = {require('../../../assets/img/nocollect@2x.png')} alt=''/>                        
                        </span>
                        <span className ='cart'>
                            <img src = {require('../../../assets/img/cart@2x.png')} alt=''/>                                                
                        </span>
                    </div>
                    <div className ='right'>
                        <div className ='addToCart'>
                            加入购物车
                        </div>
                        <div className='buybuybuy'>
                            立即购买
                        </div>
                    </div>
                 </div>              
            </div>
        )
    }
}
export default GoodsDetail