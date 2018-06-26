
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
            carouselPics:[],
            skuList:[],
            currentIndex:0,//默认显示首页
            showArr:[],
            allSpecList:[],
            ended:false,
            price:'',
            stock:'',
            img:''
        }
    }
    onClose(e){
       this.props.closeGoodsCart(e)
    }
    componentWillMount(){
        document.title = '加入购物车';               
        let id = this.props.goodsId;
        let token = localStorage.getItem('token') ? localStorage.getItem('token').replace("\"","").replace("\"",""):'' ;
        axios.get(`${lib.Api.goodsURL}/goods/goodsInfo/detail/get?id=${id}`, {
            headers: {
              'token': token,
              'channel': 'WEB'
            }
          }).then((res)=>{
              console.log(res)
              let _data = res.data.data;
              if(res.data.code === 0 ){
                  this.setState({
                      ...this.state,
                      goodsInfo:_data,
                      carouselPics:_data.carouselPics,
                      skuList:_data.skuList,
                      allSpecList:_data.allSpecList
                  });
                    let arr = [];
                    if(_data.allSpecList.length){
                        for(let i = 0 ; i < _data.allSpecList.length;i ++){
                            arr.push({currentIndex:-1});
                        }
                    }else{
                        arr.push({currentIndex :-1});
                    }
                    
                    this.setState({
                        ...this.state,
                        showArr:arr
                    })
                    console.log(this.state,'-----');                    
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
    chooseItem(i,index,e){
        console.log(i,index,e);
        this.state.showArr.splice(i,1,{currentIndex:index});
        console.log(this.state.showArr,this.state.skuList,this.state.showArr[i].currentIndex);
        let rowLi = document.querySelector(`.goods-List${i}`)
        console.log(rowLi.children); 
        // [...rowLi.children].forEach((item)=>{//去除所有同列.active
        //     if(item.classList.contains('active')){
        //         item.classList.remove('active');
        //     }
        // })    
        for(let i = 0 ; i <rowLi.children.length;i++ ){
            if(rowLi.children[i].classList.contains('active')&&rowLi.children[i]!=e.target){
                rowLi.children[i].classList.remove('active');
            }
        }
        if(e.target.classList.contains('active')){//给自己加上.active
          
        }else{
            e.target.classList.add('active');            
        }

        let lis = document.querySelector('ul#goods-tags-select').children,arr=[],state;
        console.log(lis,'----------------------------');
        var newArr= [];
        var price = [];
        var stock = [];
        var img = [];
        for(let j = 0 ; j < lis.length;j ++){
            if(lis[j].tagName == 'LI'){
                [...lis[j].children].forEach((item)=>{
                    if(item.classList.contains('active')){
                        arr.push(item.innerHTML)
                        if(arr.length===lis.length-1){
                            for(var i in this.state.skuList){
                                price.push(this.state.skuList[i].price);
                                img.push(this.state.skuList[i].coverPic);
                                stock.push(this.state.skuList[i].skuStockVo.totalStock);
                                var newListArr = [];
                                for(var j in this.state.skuList[i].specList){
                                     newListArr.push((this.state.skuList[i].specList)[j].specValue);
                                  }
                                  newArr.push(newListArr);
                                 }
                              }
                            }
                        })
                    }
                }
        
        if(newArr.length!==0){
            var index;
            console.log(arr)
            for(var i in newArr){
                if(arr.toString()===newArr[i].toString()){
                     index = i;  
                }
            }
            setTimeout(()=>{
                this.setState({
                    img:img[index],
                    stock:stock[index],
                    price:price[index]
                })
            })
            console.log(this.state.img)
        }
        if(arr.length == this.state.showArr.length){
            state = true
        }else{ 
            state = false
        }
        this.setState({
            ...this.state,
            ended:state
        })
    }
    logoLoadError(index){
        console.log(index,'----------')
    }
    render(){
        console.log(this.props.cartVisible)
        return (
            <div className = 'goodsCart-container' style ={{display:this.props.cartVisible?'block':'none'}}>
                <div className ={ this.props.cartVisible? 'showGoodsParams-active':'showGoodsParams-fade'}>
                    <div>
                        {
                            this.state.skuList.map((item,index)=>{
                                if(index == this.state.currentIndex){
                                    return (
                                       <div key ={index}>
                                            <img className ='goods' alt='' onError = {this.logoLoadError.bind(this,index)}  src = {this.state.img || this.state.goodsInfo.coverPic}/>  
                                            <div className = 'goods-detail'>
                                                <p>
                                                    ￥{this.state.price || item.price}
                                                </p>
                                                <p>
                                                    <span>库存</span>
                                                    <span>{this.state.stock || item.skuStockVo.surplusStock}</span>
                                                    <span>件</span>
                                                </p>
                                            </div>  
                                       </div>
                                    )
                                }
                            })
                        }                    
                        <img className ='close' alt='' onClick= {this.onClose.bind(this)}  src = {require('../../../assets/img/close@2x.png')}/>
                    </div>
                    <ul id ='goods-tags-select'>
                        {this.state.allSpecList.join().length&&this.state.allSpecList.map((item,i)=>{
                                return (
                                    <li key={i} className={`goods-List${i}`}>
                                        <p className ='title'>{item.name}</p>
                                        {
                                            item.value.map((val,index)=>{
                                                return(
                                                    <span style = {{opacity:val.toString().trim().length>0?1:0}}  key = {val} onClick = {this.chooseItem.bind(this,i,index)}>{val,index}</span>                                                    
                                                )
                                            })
                                        }
                                     </li>
                                )
                        })}
                        
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
                        this.props.addCartOrBuy ?
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