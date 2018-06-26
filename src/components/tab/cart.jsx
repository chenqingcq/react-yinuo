import React , {Component} from 'react'
import { Modal, List, Checkbox, Flex, Toast} from 'antd-mobile';
import axios from 'axios';
import './cart.less';
const lib = require('../../utils/lib/lib.js');
const CheckboxItem = Checkbox.CheckboxItem;
var qs = require('qs');
export default class Index extends Component {
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            total:0.00,
            complete:false,
            payNum:0,
            isNull:false,
            selectAll:false,
            goodlist:[],
            totalPrice:0,
            totalNuomi:0
        }
    }
    componentDidMount(){  
      var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
      TabBar.style.display='block'; 
      //获取购物车列表
      this.loadData();
    }
     loadData(){
        axios.get(lib.Api.memberURL+'/member/shoppingCart/list',{
            headers:{
                'token': localStorage.getItem('token'),
                'channel':'Android'
            }
        }).then((res)=>{
          if(res.data.data.length!==0&&res.data.data){
                this.setState({
                    isNull:false,
                    goodlist:res.data.data
               })
        }else{
              this.setState({
                  isNull:true
              })
      }
    })
   }

    //全选商品
    selectAllGood(){
        var all=document.querySelector('.selectAll .am-checkbox-input');
        var checkboxList=document.getElementsByClassName('am-checkbox');
        for(var i=0;i<checkboxList.length;i++){
            if(all.checked){
                if(checkboxList[i].getAttribute('class')!=='am-checkbox am-checkbox-disabled'){
                    checkboxList[i].setAttribute('class','am-checkbox am-checkbox-checked');
                    var selected=document.querySelectorAll('.goodsMsg .goodItem .goodsDet .am-checkbox-wrapper .am-checkbox-checked');
                    this.setState({
                        payNum:selected.length,
                        selectAll:true
                    })
                } 
            }else{
              if(checkboxList[i].getAttribute('class')!=='am-checkbox am-checkbox-disabled'){
                checkboxList[i].setAttribute('class','am-checkbox');
                this.setState({
                    payNum:0,
                    selectAll:false
                })
              } 
            }
        }
        this.getTotalNum();
    }
    isShow(){
        this.setState({
            isShow:!this.state.isShow,
            complete:!this.state.complete,
        })
    }
    getTotalNum(){
         var checkedList = document.querySelectorAll('.goodsMsg .goodItem .goodsDet .am-checkbox.am-checkbox-checked');
         var arr = [];
         var totalPrice= 0;
         var totalNuomi = 0;
        for(var i=0;i<checkedList.length;i++){
              arr.push(checkedList[i].parentNode.parentNode.parentNode.parentNode)
        }
        for(var i=0;i<arr.length;i++){
            var price =parseFloat(arr[i].querySelector('.countNum .price').innerText.substr(1));
            var nuo =parseFloat(arr[i].querySelector('.countNum .nuo').innerText.substr(1));
            var count = parseFloat(arr[i].querySelector('.countNum .totalnum .count').innerText);
            totalPrice+=price*count.toFixed(2);
            totalNuomi+=nuo*count.toFixed(2);
        }
        this.setState({
            totalPrice:totalPrice,
            totalNuomi:totalNuomi
        })
    }
    //对商品进行删除
    delete(){
        var isSelect= document.querySelectorAll('.goodsDet .am-checkbox-checked');
        if(isSelect.length!==0){
            if(this.refs.del.innerHTML==='删除'){
                Modal.alert('', '您确定要删除该商品吗', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    {
                      text: '确定',
                      onPress: () =>
                        new Promise((resolve) => {
                          var selectedLength = document.querySelectorAll('.goodsMsg .goodItem .goodsDet .am-checkbox.am-checkbox-checked');
                          var arr = [];
                          for(var i=0;i<selectedLength.length;i++){
                            arr.push(selectedLength[i].parentNode.parentNode.parentNode.parentNode.getAttribute('id'))
                          }
                          var param ={
                              'ids':arr.toString()
                          }
                          axios.post(lib.Api.memberURL+'/member/shoppingCart/delete',qs.stringify(param),{
                              headers:{
                                  'token':localStorage.getItem('token'),
                                  'channel':'Android'
                              }
                          }).then((res)=>{
                              console.log(res)
                               if(res.code===0){
                                 Toast.info('删除成功', 1);
                               }
                          })
                          setTimeout(()=>{this.loadData()},500)
                          setTimeout(resolve, 1000);
                        })
                    }
                  ])
             }     
        }else{
            Toast.info('请选择一个商品', 1);
        }
         
    }
    //对商品数量进行上加
    addPrice(e){
        console.log(e.target.style.color)
      if(this.refs.del.innerHTML==='删除'&&e.target.style.color!=='rgb(204, 204, 204)'){
          var num =e.target.previousElementSibling.innerHTML;
          num++;
          e.target.previousElementSibling.innerHTML=num;
      }
       this.getTotalNum()
    }
    //对商品数量进行下减
    reducePrice(e){
      if(this.refs.del.innerHTML==='删除'&&e.target.style.color!=='rgb(204, 204, 204)'){
        var num =e.target.nextElementSibling.innerHTML;
        num--;
        if(num<1){
            num=1;
        }
        e.target.nextElementSibling.innerHTML=num;
      }
      this.getTotalNum()
    }
    goodIsSelected(e){
        e.preventDefault();
        if(e.target.parentNode.getAttribute('class')==='am-checkbox'){
            e.target.parentNode.setAttribute('class','am-checkbox am-checkbox-checked');
            this.setState({
                payNum:this.state.payNum+1,
                selectAll:true
            })
        }else{
            e.target.parentNode.setAttribute('class','am-checkbox');
            this.setState({
                payNum:this.state.payNum-1
            })
        }
        this.getTotalNum();
    }
    render (){
        return (
          <div>
               <div className="headerBar">
                  <span onClick={this.isShow.bind(this)}>{this.state.complete?'完成':'编辑'}</span>
                  <img src={require('../../assets/img/消息提示@2x.png')}/>
               </div>
               <div className="nothing" style={{display:this.state.isNull?'block':'none'}}>
                 <div><img src={require('../../assets/img/购物车空@2x.png')}/></div>
                 <span>购物车空空如也</span>
                 <button>马上去购物</button>
               </div>
               <div className="goodsMsg" style={{display:this.state.isNull?'none':'block'}}>
                     { this.state.goodlist.map((val,index)=>{
                        return(<div className="goodItem" value={val.shopId}>
                            <div className="shop">
                                <CheckboxItem>
                                </CheckboxItem>
                                <img src={require('../../assets/img/dianpu_btn@2x.png')}/>
                                <span>{val.shopName}></span>
                            </div>
                           { val.showVos.map((value,index)=>{
                             return(
                                <div className="goodsDet" key={value.id} id={value.id}>
                                    <CheckboxItem onClick={this.goodIsSelected.bind(this)} disabled={value.goodsStatus===0?false:true}>
                                    </CheckboxItem>
                                    <div className="countNum">
                                    <img src={value.goodsCoverPic}/>
                                    <div className="outdate" style={{display:value.goodsStatus===0?'none':'block'}}>{value.goodsStatus===1?'失效':'缺货'}</div>
                                    <h3 style={{color:value.goodsStatus===0||value.goodsStatus===2?'#2b2b2b':'#ccc'}}>{value.skuName?(value.skuName.length>=20?value.skuName.substr(0,20)+'...':value.skuName):''}</h3>
                                    <h4 style={{color:value.goodsStatus===0?'#666':'#ccc'}}>{value.specsStr?(value.specsStr.length>=10?value.specsStr.substr(0,10)+'...':value.specsStr):''}</h4>
                                    <span className="price" style={{color:value.goodsStatus===0?'#D30000':'#ccc'}}>￥{value.skuPrice}<a style={{display:value.skuMarketPrice===0?'none':'block',color:value.goodsStatus===0?'#666':'#ccc'}}>￥{value.skuMarketPrice}</a></span>
                                    <span className="nuo" style={{color:value.goodsStatus===0?'#D30000':'#ccc'}}><img src={require('../../assets/img/nuomi@2x.png')} style={{display:value.goodsStatus===0?'block':'none'}}/>
                                    <img src={require('../../assets/img/nuomi1@2x.png')} style={{display:value.goodsStatus===0?'none':'block'}}/>
                                    &nbsp; &nbsp;+{value.nuomi.toFixed(2)}</span>
                                    <span className="totalnum"><b onClick={this.reducePrice.bind(this)}  style={{color:value.goodsStatus===0?'#6b6b6b':'#ccc'}}>-</b>
                                     <a  className="count" style={{background:'#f4f4f4',color:value.goodsStatus===0?'#666':'#ccc'}}>{value.goodsNum}</a><b onClick={this.addPrice.bind(this)} style={{color:value.goodsStatus===0?'#D30000':'#ccc'}}>+</b></span>
                                    </div>
                                </div>
                           )})}
                         </div>)
                        })
                    }
                   </div>
               <div className="selectAll" style={{display:this.state.isNull?'none':'block'}}>
                  <CheckboxItem onClick={this.selectAllGood.bind(this)}>全选
                  </CheckboxItem> 
                  <span className="total" style={{display:this.state.complete?'none':'block'}}>合计:<a style={{position:'relative',top:this.state.selectAll?'-8px':'0px'}}>￥{this.state.totalPrice.toFixed(2)}</a> 
                   <a style={{display:this.state.selectAll?'block':'none',position:'relative',left:'33px',top:'-5px'}}><img src={require('../../assets/img/nuomi@2x.png')} style={{width:'7px',height:'11px'}} />&nbsp;+{this.state.totalNuomi.toFixed(2)}</a></span>
                  <a style={{background:this.state.complete?'#ccc':'#d30000'}} ref="del" onClick={this.delete.bind(this)}>{this.state.complete?'删除':'结算'+(this.state.payNum===0?'':'('+this.state.payNum+')')}</a>
               </div>
          </div>
          )
    }
}