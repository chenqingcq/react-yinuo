
import React from 'react';
import axios from 'axios';
import qs from 'qs'

import './goodsCart.less';
const lib = require('../../../utils/lib/lib.js');

class  GoodsCart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            goodsInfo:'',
            number:1,
            carouselPics:[]
        }
    }
    onClose(e){
       this.props.closeGoodsCart(e)
    }
    componentWillMount(){
        document.title = '加入购物车';               
        let id = window.sessionStorage.getItem('goodsId') || '' 
        let token = localStorage.getItem('token') ? localStorage.getItem('token').replace("\"","").replace("\"",""):'' ;
        axios.get(`${lib.Api.goodsURL}/goods/goodsInfo/detail/get?id=${id}`, {
            headers: {
              'token': token,
              'channel': 'Android'
            }
          }).then((res)=>{
              console.log(res)
              if(res.data.code === 0 ){
                  this.setState({
                      ...this.state,
                      goodsInfo:res.data.data,
                      carouselPics:res.data.data.carouselPics
                  })
                  setTimeout(()=>{
                    console.log(this.state.carouselPics)
                })
              }
          }).catch((err)=>{
              console.log(err)
          });
    }
    minusNumber(){
        if(this.state.number<=1){
            this.setState({
                ...this.state,
                number : 1
            })
        }else{
            this.setState({
                ...this.state,
                number : this.state.number -1
            })
        }
    }
    addNumber(){
        console.log(this.state.number)
        this.setState({
            ...this.state,
            number : this.state.number +1
        })
    }
    render(){
        return (
            <div className = 'goodsCart-container' style ={{display:this.props.cartVisible?'block':'none'}}>
                <div className ={ this.props.cartVisible? 'showGoodsParams-active':'showGoodsParams-fade'}>
                    <div>
                        <img className ='goods' alt=''  src = {require('../../../assets/img/koubeihaodian_btn@2x.png')}/>  
                        <div className = 'goods-detail'>
                            <p>
                                ￥888
                            </p>
                            <p>
                                <span>库存</span>
                                <span>666</span>
                                <span>件</span>
                            </p>
                        </div>                      
                        <img className ='close' alt='' onClick= {this.onClose.bind(this)}  src = {require('../../../assets/img/close@2x.png')}/>
                    </div>
                    <ul>
                        <li>
                            <p className ='title'>尺寸</p>
                            <span>S</span>
                            <span className ='active'>M</span>
                            <span>预售7天内</span>
                        </li>
                        <li>
                            <p className ='title'>颜色分类</p>
                            <span>蓝色</span>
                            <span>红色</span>
                        </li>
                        
                        <div className='operate'>
                            <div>购买数量</div>
                            <div className = 'add-minus'>
                                <span className='minus' onClick = {this.minusNumber.bind(this)}>
                                    <img alt='' src={require('../../../assets/img/minus@2x.png')}/>
                                </span>
                                <span className='number'>{this.state.number}</span>
                                <span className='add' onClick={this.addNumber.bind(this)}>
                                    <img alt='' src={require('../../../assets/img/add@2x.png')}/>                                    
                                </span>
                            </div>
                        </div>
                    </ul>
                    {
                        false?
                        (<div className='addToCart' >
                            加入购物车
                        </div>) :
                        (
                        <div className='addToCart'>
                            确定    
                        </div>  
                        )
                    }
                </div>
            </div>
        )
    }
}
export default  GoodsCart