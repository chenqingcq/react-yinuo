import React, {Component} from 'react';
import ReactPullLoad,{ STATS } from 'react-pullload'
import {Redirect} from "react-router-dom";
import { Modal, Toast } from 'antd-mobile';
import Button from '../../../pages/button/button';
import './addressManage.less';
import {initAdressList , getAdressList , deleteAdress} from './actions';
import axios from 'axios';
import {updateAdress} from './actions';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
const loadMoreLimitNum  = 4;
export default class AddressManage extends Component {
    constructor(props){
        super(props);
        this.state= {
            text:'新增地址',
            hasMore: true,
            action: STATS.init,
            link_to_editAddress:false,
            pageSize:4,
            pageNum:1,
            recieviers :[] ,
            paddingTop:0,
            index: loadMoreLimitNum,
            currentIndex:0
        }
    }
    componentDidMount(){
     document.title = '地址管理'; 
      // getAdressList({
      //   pageNum:this.state.pageNum,
      //   pageSize:this.state.pageSize
      // })
      axios.get(lib.Api.memberURL+'/member/memberAddress/list?pageNum='+this.state.pageNum+'&pageSize='+this.state.pageSize,
      {
        headers: {
          'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
          'channel': 'Android'
        }
      }).then((res)=>{
        console.log(res.data.data.rows);
        if(res.data.code === 1 && res.data.data === null){
          Toast.info(res.data.errorMsg,1);
          this.props.history.push('/member/addNewAddress');
        }
        if(res.data.code ===0 && !res.data.data.rows.length){        
          this.props.history.push('/member/addNewAddress'); 
          return;    
        }
        if(res.data.code ===0  ){
            console.log(res.data.data.rows);
            this.setState({
              ...this.state,
              recieviers:res.data.data.rows
            })
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
    handlerSetDefault(index,id){
      console.log(index,id);
      Modal.alert('设为默认地址?', '', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => {
              this.setState({
                ...this.state,
                currentIndex:index
              })
                //设置为默认
              // updateAdress({isDefault:0,id:id})
              axios.post(lib.Api.memberURL+'/member/memberAddress/update',qs.stringify(
                {
                      isDefault:0,
                       id:id
                }
            ), {
                headers: {
                  'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                  'channel': 'Android'
                }
              })
              .then((res)=>{
                console.log(res);
                if(res.data.code == 0 ){
                  Toast.info('设置成功!',1);
                }
              }).catch((err)=>{
                console.log(err)
              })
          } 
       },
      ])     
    }
    deletAddress(id,index){
      console.log(id , index);
      Modal.alert('确定删除地址吗?', '', [
        { text: '取消', onPress: () => console.log('cancel') },
        {
          text: '确定', 
          onPress: () =>{   
            console.log(this.state.recieviers);
            // deleteAdress({id:id}).
            axios.post(lib.Api.memberURL+'/member/memberAddress/delete',qs.stringify(
              {
                     id:id
              }
          ), {
              headers: {
                'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
                'channel': 'Android'
              }
            }).
            then((res)=>{
              console.log(res);
              if(res.data.code === 0 && res.data.data === null ){
                let arr = this.state.recieviers.splice(index,1);//删除对应的地址
                console.log(arr);
                Toast.info('删除成功!',1);
                this.setState({
                  ...this.state
                })
              }
              if(res.data.code == 1){
                Toast.fail(res.data.errorMsg,1)
              }
            }).catch((err)=>{
              console.log(err)
            })
          }
        },
      ])
    }
    link_to_editAddress(item){
      window.sessionStorage.setItem('editWitchAddreess',JSON.stringify(item));
      this.setState({
        ...this.state,
        link_to_editAddress:true
      })
    }
    add_address(){
      this.props.history.push('/member/createAddress')
    }
    handleAction = (action) => {
      console.info(action, this.state.action,action === this.state.action);
      //new action must do not equel to old action
      if(action === this.state.action){
        return false
      }
  
      if(action === STATS.refreshing){//刷新
        this.handRefreshing();
      } else if(action === STATS.loading){//加载更多
        this.handLoadMore();
      } else{
        //DO NOT modify below code
        this.setState({
          action: action
        })
      }
    }
    handLoadMore = () => {//下拉加载
      if(STATS.loading === this.state.action){
        return false
      }
      setTimeout(()=>{
        if(this.state.index === 0){
          this.setState({
            ...this.state,
            action: STATS.reset,
            hasMore: false
          });
        } else{
          this.setState({
            // data: [...this.state.data, cData[0], cData[0]],
            ...this.state,
            action: STATS.reset,
            index: this.state.index - 1
          });
        }
      }, 200)
      this.setState({
        action: STATS.loading
      })
    }
    handRefreshing = () =>{//上拉刷新
      if(STATS.refreshing === this.state.action){
        return false
      }
      setTimeout(()=>{
        //refreshing complete
        this.setState({
          // data: cData,
          ...this.state,
          hasMore: true,
          action: STATS.refreshed,
          index: loadMoreLimitNum
        });
      },200)
      this.setState({
        ...this.state,
        action: STATS.refreshing
      })
    }
    render(){
      if(this.state.link_to_editAddress){
        return <Redirect to ='/member/editAddress' ></Redirect>
      }else if (this.state_link_createAddress){
        return <Redirect to ='/member/createAddress' ></Redirect>        
      }else{
        return(
          <div className = 'addressManage-contiainer'>
          <ReactPullLoad 
            downEnough={1000}
            isBlockContainer = {true}
            action={this.state.action}
            handleAction={this.handleAction}
            hasMore={this.state.hasMore}
            style = {{paddingTop:this.state.paddingTop}}
            // HeadNode = {}
            // FooterNode = {}
            distanceBottom={1000}>
            <ul className = 'pull-container '>
              {this.state.recieviers.map((item,index)=>{
                return (
                  <li key ={index} className={index ===0?'address-default':'address-detail' } >
                   <div className={index ===0?'address-default':'address-detail' }>
                    <p className = 'title'>
                          <i>
                            <span className ='user-name'>{item.name}</span>
                            <span>{item.isDefault  ==  0 ?  '[默认]':`[${item.alias}]`}</span>                    
                          </i>
                          <span>{item.phone}</span>
                      </p>
                      <p className='detail'>
                        {item.detailAddr}
                      </p>
                   </div>
                   <div className='address-operate'>
                     <div className='left' onClick={this.handlerSetDefault.bind(this,index,item.id)}>
                        <i>
                          <img className = {(index === this.state.currentIndex )?'address-active':'address-no-active'} src={require('../../../assets/img/quanxuan_bt.png@2x.png')} alt='' />
                        </i>
                        <span>设为默认地址</span>
                     </div>
                     <div className='right'>
                        <i className='edit' onClick = {this.link_to_editAddress.bind(this,item)}>
                          <img  src={require('../../../assets/img/bianji.png')} alt='' />  
                          <span>编辑</span>                      
                        </i>
                        <i onClick = {this.deletAddress.bind(this,item.id,index)}>
                          <img  src={require('../../../assets/img/gouwucheljitong_icon.png')} alt='' />  
                          <span>删除</span>  
                        </i>
                     </div>
                   </div>
                  </li> 
                )
              })}         
            </ul>
            </ReactPullLoad>
            <li  id = 'address-plus'>
                <Button handlerClick = {this.add_address.bind(this)} styleSheet = {{background:'#D30000',color:'#fff',width:'90%',margin:'0 auto'}}  text={this.state.text} />            
              </li> 
          </div>
        )   
      }
     
    }
}