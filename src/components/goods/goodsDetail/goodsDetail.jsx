import React from 'react';
import axios from 'axios';
import qs from 'qs'
import { Carousel, WingBlank ,Icon,ActionSheet,Badge} from 'antd-mobile';

import GoodsParams from '../goodsParams/goodsParams'
import GoodsCart from '../goodsCart/goodsCart'
import './goodsDetail.less'
// import Tab from '../tab/tab'
const lib = require('../../../utils/lib/lib.js');

class GoodsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            shopInfo:'',
            hasComments:false,            
            carouselPics:[1,1,1],
            goodsName:'',
            isAutoPlay:false,//是否自动轮播
            visible :false,//商品参数是否显示
            cartVisible:false,//购物车是否显示
            shopDeliveryAddress:'',//收货地址
            sale:0,//销售量,
            nuomi:0 ,//糯米数
            price:0 ,//销售价
            postage:0,//快递费
            monthlySales:0,//月销量
            deliveryTime:'',//承诺发货时间
            introductionImgJson:[],//介绍图片
            attrList:[],//属性列表
            allSpecList:[],//系统默认规格
            attrListInAll:'',
            isFavored:false,
            skuList:[],//购物车商品列表
            addCartOrBuy:false,//false为加入购物车true为立即购买
            objId:null,//商品id
            type:null//商品类型
        }
    }
    componentDidMount(){   
        var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
        TabBar.style.display='none';
        document.title = '商品详情';
        let id = this.props.match.params.goodsId.substr(1);     
        let token = localStorage.getItem('token') ? localStorage.getItem('token').replace("\"","").replace("\"",""):'' ;
        axios.get(`${lib.Api.goodsURL}/goods/goodsInfo/detail/get?id=${id}`, {
            headers: {
              'token': token,
              'channel': 'WEB'
            }
          }).then((res)=>{
              console.log(res)
              if(res.data.code === 0 ){
                  let _data = res.data.data;
                  this.setState({
                      ...this.state,
                      shopInfo:_data.shopInfo || "",
                      carouselPics:[..._data.carouselPics],
                      goodsName:_data.name,
                      goodsInfo:_data,
                      shopDeliveryAddress:_data.shopDeliveryAddress,
                      sale:_data.sale,
                      nuomi:_data.nuomi[0],
                      marketPrice:_data.marketPrice.join("-"),
                      price:_data.price.join("-"),
                      monthlySales:_data.monthlySales,
                      postage:_data.postage,
                      deliveryTime:_data.deliveryTime,
                      introductionImgJson:_data.spuExtend.introductionImgJson,
                      isAutoPlay:true,
                      attrList:_data.attrList,
                      skuList:_data.skuList,
                      isFavored:_data.isFavored,
                      type:_data.goodsType,
                      objId:_data.id  
                  })
                  setTimeout(()=>{
                    console.log(this.state);
                    let res = '';
                    for(let i = 0 ; i < this.state.attrList.length;i++){
                        // console.log(this.state.attrList[i],'--------------');
                        if(i < 2){
                            res += ' ' + this.state.attrList[i].attrName
                        }
                        if(i == 3){
                            res += ' ' + '...'                      
                        }
                    }
                    this.setState({
                        ...this.state,
                        attrListInAll:res
                    })
                })
              }
          }).catch((err)=>{
              console.log(err)
          });
         
    }
    goodsCollect(e){
        // axios.get(lib.Api.memberURL+`/member/memberFavorite/check?type=${this.state.type}&objId=${this.state.objId} `, {
        //     headers: {
        //       'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
        //       'channel': 'WEB'
        //     }
        //   }).then((res)=>{
        //       console.log(res);
        //   }).catch((err)=>{
        //       console.log(err);
        //   })
        console.log(this.refs.collect);
        if(this.refs.collect.classList.contains('goods-collect-active')){//取消收藏
            this.refs.collect.classList.remove('goods-collect-active');
            // this.refs.collect.src =require( '../../../assets/img/nocollect@2x.png');
            this.setState({
                ...this.state,
                isFavored:false
            })
        }else{//收藏
            this.refs.collect.classList.add('goods-collect-active');
            this.setState({
                ...this.state,
                isFavored:true
            })
            return;
            axios.post(lib.Api.memberURL+'/member/memberFavorite/create',qs.stringify(
                {
                   type:this.state.type ,
                   objId:this.state.objId,
                   id:222
                }
            ), {
                headers: {
                  'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                  'channel': 'WEB'
                }
              }).then((res)=>{
                  console.log(res)
              }).catch((err)=>{
                  console.log(err)
              }) 
        }
    }
    showGoodsParams(e){
        e.preventDefault();
        console.log(this);
        this.setState({
            ...this.state,
            visible:true//
        })
    }
    showGoodsCart(bool,e){
        e.preventDefault();  
        this.setState({
            ...this.state,
            cartVisible:true,
            addCartOrBuy:bool
        })      
    }
    closeGoodsParams(e){
        e.preventDefault();
        console.log(this);
        this.setState({
            ...this.state,
            visible:false
        })
    }
    closeGoodsCart(e){
        e.preventDefault();
        this.setState({
            ...this.state,
            cartVisible:false
        })
    }
    link_to_all_comments(){//所有评论
        this.props.history.push('/goods/goodsAllComments')
    }
    showTel(){
        const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
    let wrapProps;
    if (isIPhone) {
        wrapProps = {
        onTouchStart: e => e.preventDefault()
        }
    }
  
        const BUTTONS = [ this.state.shopInfo.contactsPhone, '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            // title: 'title',
            message: '',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
          },
          (buttonIndex) => {
            console.log(buttonIndex)
            if(buttonIndex == 0){
                window.location.href = `tel:${this.state.shopInfo.contactsPhone}`
            }
          });
    }
    jump_to_home(){
        this.props.history.push('/index')
    }
    goBack(){
        this.props.history.goBack()  ;
    }
    link_to_cart(){
        this.props.history.push('/cart')
    }
    render(){ 
        return (
            <div className='goods-container'>
                <div className='carousel-container'>
                    <div className ='carousel-panel'>            
                     <div className='goods-carousel'>
                        <div className ='banner-logo'>
                            <span onClick = {this.goBack.bind(this)}>
                                <img src={require('../../../assets/img/backicon@2x.png')} alt=''/>
                            </span>
                            <span className ='home' onClick = {this.jump_to_home.bind(this)}>
                                <img src={require('../../../assets/img/home@2x.png')} alt=''/>                                
                            </span>
                            <span className = 'message'>
                                <img src={require('../../../assets/img/message@2x.png')} alt=''/>                                
                                <Badge text="" dot style={{ display:'absolute',right:5,top:-20}} />                                
                            </span>
                        </div>
                        {/* <WingBlank> */}
                            <Carousel
                            autoplay={this.state.isAutoPlay}
                            infinite
                            dotStyle = {{background:'#fff'}}    
                            dotActiveStyle = {{background:'#D30000'}}
                            beforeChange={()=>{} }
                            afterChange={()=>{}}
                            >
                            {this.state.carouselPics.map(val => (                  
                                <img   
                                    style={
                                        {
                                            width:'100%',
                                            // height:this.state.imgHeight
                                        }
                                    }
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                     }}
                                   key = {val}  
                                   src={val} 
                                   alt=''/>
                            ))}         
                            </Carousel>
                            {/* </WingBlank> */}
                         </div>
                     <div className='goods-intr'>
                            <div className='goods-name'>
                                {this.state.goodsName}
                            </div>
                            <div className='goods-price'>
                                <p className='pre-now-price'>
                                    <span>￥{this.state.price}</span>
                                    <span>￥{this.state.marketPrice}</span>
                                </p>
                                <p className='month-out'>
                                    <img src = {require('../../../assets/img/nuomi@2x.png')} alt=''/>                                                
                                    <span>{this.state.nuomi.toFixed(4)}</span>
                                    <span className='count' >
                                        月销量:<span>{this.state.monthlySales}</span>
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
                                  <span>{this.state.deliveryTime}</span>
                              </li>
                              <li onClick = {this.showGoodsParams.bind(this)}>
                                    <div className='param'>
                                        参数
                                    </div> 
                                    <div className='style'>
                                       <div>
                                            <span>{this.state.attrListInAll}</span>        
                                        </div>  
                                        <img src ={require('../../../assets/img/arrow_right_btn24@2x.png')} alt=''/>
                                    </div>                  
                                </li>
                          </ul>
                    </div>
                    <div className='goods-comments' style={{display:this.state.hasComments?'block':'none'}}>
                           <div className='top'>
                                <div className='comments-number'>
                                    <span>商品评论</span>
                                    <span>(9999)</span>
                                </div>
                                <div className='goodsCm-num' onClick={this.link_to_all_comments.bind(this)}>
                                    <span>好评论</span>
                                    <span>98%</span>
                                    <Icon color= '#D30000' size ='md' type='right'/>
                                </div>
                           </div>
                           <div className='bottom'>
                                <div className='left'>
                                    <div className='nickname'>
                                        <span className='nickName'>昵称</span>
                                        <span className='comements-container'>  
                                        杯子简直不要太好看哦，用泡沫围起来的感觉很安全，泡红糖水一直找不到合适的杯子，这下...
                                        杯子简直不要太好看哦，用泡沫围起来的感觉很安全，泡红糖水一直找不到合适的杯子，这下...
                                        </span>
                                    </div>
                                    <div className='hasimg'>
                                        <img alt='' src={require('../../../assets/img/chexian_btn @2x.png')}/>                                            
                                    </div>
                                </div>
                                <div className='more-comments'>更多评论</div>
                           </div>
                    </div>  
                    <div className='shop-container' style={{height:this.state.shopInfo?"auto":0,opacity:this.state.shopInfo?1:0}}>
                            <div className="left">
                                <img src={this.state.shopInfo.logo} alt="" className="icon"/>
                            </div>
                            <div className="right">
                                <p className="name">
                                    <span>{this.state.shopInfo.name}</span>
                                    <span className="title">{this.state.shopInfo.type ==0 ? '个人':'品牌'}</span>
                                </p>
                                <p className="operate">
                                    <span className="left">
                                        <span>{this.state.shopInfo.goodsCount}</span>件商品
                                    </span>
                                    <span className="rihgt">进店逛逛</span>
                                </p>
                            </div>
                    </div>  
                    <div className='intro-imgs' style = {{height:this.state.introductionImgJson.length?'auto':0}}>
                            {
                                this.state.introductionImgJson.map((url)=>{
                                   return (
                                        <img alt=''
                                        src={`${url}`}
                                        style = {
                                        {
                                            width:'100%',
                                            // height:this.state.imgHeight
                                        }
                                    }
                                        onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        }}
                                        onError= {
                                            ()=>{
                                                console.log('-----')
                                            }
                                        }
                                        key = {url}
                                        />
                                   )
                                })
                            }
                    </div> 
                    </div>
                 </div>
                <div className='goods-tab-container'>
                    <div className ='left'>
                        <span className ='person-service' onClick = {this.showTel.bind(this)}>
                            <img src = {require('../../../assets/img/pserson-service@2x.png')} alt=''/>
                            <span>客服</span>
                        </span>
                        <span  className ='collect' onClick={this.goodsCollect.bind(this)}>
                            <img  ref='collect' src = {this.state.isFavored ? require('../../../assets/img/collected@2x.png'):require('../../../assets/img/nocollect@2x.png')} alt=''/>                        
                            <span>收藏</span>
                        </span>
                        <span className ='cart' onClick = {this.link_to_cart.bind(this)}>
                            <img src = {require('../../../assets/img/cart@2x.png')} alt=''/>                                                
                            <span>购物车</span>
                        </span>
                    </div>
                    <div className ='right'>
                        <div className ='addToCart' onClick = {this.showGoodsCart.bind(this,true)}>
                            加入购物车
                        </div>
                        <div className='buybuybuy' onClick = {this.showGoodsCart.bind(this,false)}>
                            立即购买
                        </div>
                    </div>
                 </div>   
                 <GoodsParams attrList = {this.state.attrList} visible = {this.state.visible} closeGoodsParams = {this.closeGoodsParams.bind(this)} />           
                 <GoodsCart goodsId = {this.props.match.params.goodsId.substr(1)} skuList = {this.state.skuList} imgUrl = {this.state.carouselPics} addCartOrBuy = {this.state.addCartOrBuy} cartVisible = {this.state.cartVisible} closeGoodsCart = {this.closeGoodsCart.bind(this)} />           
            </div>
        )
    }
}
export default GoodsDetail