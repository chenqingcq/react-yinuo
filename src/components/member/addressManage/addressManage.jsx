import React, {Component} from 'react';
import ReactPullLoad,{ STATS } from 'react-pullload'
import {Redirect} from "react-router-dom";
import { Modal, Toast } from 'antd-mobile';
import Button from '../../../pages/button/button';
import './addressManage.less';
import {initAdressList , getAdressList , deleteAdress} from './actions';
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
            index: loadMoreLimitNum
        }
    }
    componentDidMount(){
     document.title = '地址管理'; 
      getAdressList({
        pageNum:this.state.pageNum,
        pageSize:this.state.pageSize
      }).then((res)=>{
        console.log(res);
        if(res.data.code === 1 && res.data.data === null){
          Toast.info(res.data.errorMsg,1);
        }
        if(res.data.code ===0){
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
    handlerSetDefault(index,item){
      console.log(index,item);
      this.setState({
        ...this.state,
        currentIndex:index
      })
    }
    deletAddress(id,index){
      console.log(id , index);
      Modal.alert('确定删除地址吗?', '', [
        { text: '取消', onPress: () => console.log('cancel') },
        {
          text: '确定', 
          onPress: () =>{   
            console.log(this.state.recieviers);
            deleteAdress({id:id}).then((res)=>{
              console.log(res);
              if(res.data.code === 0 && res.data.data === null ){
                let arr = this.state.recieviers.splice(index,1);//删除对应的地址
                console.log(arr);
                Toast.info('删除成功!',1);
                this.setState({
                  ...this.state
                })
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
        return <Redirect to ='/member/editAddress?mode=edit' ></Redirect>
      }else if (this.state_link_createAddress){
        return <Redirect to ='/member/editAddress?mode=create' ></Redirect>        
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
                            <span>{item.isDefault  ===  0 ?  '[默认]':`[${item.alias}]`}</span>                    
                          </i>
                          <span>{item.phone}</span>
                      </p>
                      <p className='detail'>
                        {item.detailAddr}
                      </p>
                   </div>
                   <div className='address-operate'>
                     <div className='left' onClick={this.handlerSetDefault.bind(this,index,item)}>
                        <i>
                          <img className = {(index === this.state.currentIndex || item.isDefault === 0 )?'address-active':'address-no-active'} src={require('../../../assets/img/quanxuan_bt.png@2x.png')} alt='' />
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