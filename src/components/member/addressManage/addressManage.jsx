import React, { Component } from 'react';
import ReactPullLoad, { STATS } from 'react-pullload'
import { Redirect } from "react-router-dom";
import { Modal, Toast } from 'antd-mobile';
import Button from '../../../pages/button/button';
import './addressManage.less';
import { initAdressList, getAdressList, deleteAdress } from './actions';
import axios from 'axios';
import { updateAdress } from './actions';
import { resolve } from 'path';
import { rejects } from 'assert';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
const loadMoreLimitNum = 10;
export default class AddressManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '新增地址',
      hasMore: true,
      action: STATS.init,
      link_to_editAddress: false,
      pageSize: 10,
      pageNum: 1,
      recieviers: [],
      paddingTop: 0,
      index: loadMoreLimitNum,
      currentIndex: -1,
      paddingTop :0
    }
  }
  componentDidMount() {
    var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
    TabBar.style.display='none';
    document.title = '地址管理';
    // getAdressList({
    //   pageNum:this.state.pageNum,
    //   pageSize:this.state.pageSize
    // })
    let token =localStorage.getItem('token')? localStorage.getItem('token').replace("\"", "").replace("\"", ""):'';
    axios.get(lib.Api.memberURL + '/member/memberAddress/list?pageNum=' + this.state.pageNum + '&pageSize=' + this.state.pageSize,
      {
        headers: {
          'token': token ,
          'channel': 'WEB'
        }
      }).then((res) => {
        console.log(res.data.data.rows);
        if (res.data.code === 1 && res.data.data === null) {
          Toast.info(res.data.errorMsg, 1);
          this.props.history.push('/member/addNewAddress');
        }
        if (res.data.code === 0 && !res.data.data.rows.length) {
          this.props.history.push('/member/addNewAddress');
          return;
        }
        if (res.data.code === 0) {
          console.log(res.data.data.rows);
          this.setState({
            ...this.state,
            recieviers: res.data.data.rows
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  handlerSetDefault(index, id) {
    console.log(index, id);
    Modal.alert('设为默认地址?', '', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          this.setState({
            ...this.state,
            currentIndex: index
          })
          //设置为默认
          // updateAdress({isDefault:0,id:id})
          axios.post(lib.Api.memberURL + '/member/memberAddress/update', qs.stringify(
            {
              isDefault: 0,
              id: id
            }
          ), {
              headers: {
                'token': localStorage.getItem('token').replace("\"", "").replace("\"", ""),
                'channel': 'WEB'
              }
            })
            .then((res) => {
              console.log(res);
              if (res.data.code == 0) {
                Toast.info('设置成功!', 1);
              }
            }).catch((err) => {
              console.log(err)
            })
        }
      },
    ])
  }
  deletAddress(id, index) {
    console.log(id, index);
    Modal.alert('确定删除地址吗?', '', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {
          console.log(this.state.recieviers);
          // deleteAdress({id:id}).
          axios.post(lib.Api.memberURL + '/member/memberAddress/delete', qs.stringify(
            {
              id: id
            }
          ), {
              headers: {
                'token': localStorage.getItem('token').replace("\"", "").replace("\"", ""),
                'channel': 'WEB'
              }
            }).
            then((res) => {
              console.log(res);
              if (res.data.code === 0 && res.data.data === null) {
                let arr = this.state.recieviers.splice(index, 1);//删除对应的地址
                console.log(arr);
                Toast.info('删除成功!', 1);
                this.setState({
                  ...this.state
                })
              }
              if (res.data.code == 1) {
                Toast.fail(res.data.errorMsg, 1)
              }
            }).catch((err) => {
              console.log(err)
            })
        }
      },
    ])
  }
  link_to_editAddress(item) {
    window.sessionStorage.setItem('editWitchAddreess', JSON.stringify(item));
    this.setState({
      ...this.state,
      link_to_editAddress: true
    })
  }
  add_address() {
    this.props.history.push('/member/createAddress')
  }
  handleAction = (action) => {
    console.info(action, this.state.action, action === this.state.action);
    //new action must do not equel to old action
    if (action === this.state.action) {
      return false
    }

    if (action === STATS.pulling) {//刷新
      this.handRefreshing();
    } else if (action === STATS.loading) {//加载更多
      this.handLoadMore();
    } else {
      //DO NOT modify below code
      this.setState({
        action: action
      })
    }
  }
  handLoadMore= ()=>{//上拉加载
    if (STATS.loading === this.state.action) {
      return false
    }
    setTimeout(() => {
      if (this.state.index === 0) {
        this.setState({
          ...this.state,
          action: STATS.reset,
          hasMore: false
        });
      } else {
        new Promise((resolve, rejects) => {
          this.setState({
            ...this.state,
            pageNum: this.state.pageNum + 1
          });
          setTimeout(() => {
            resolve(this.state.pageNum)
          })
        }).then((pageNum) => {
          //分页
          axios.get(lib.Api.memberURL + '/member/memberAddress/list?pageNum=' + pageNum + '&pageSize=' + this.state.pageSize,
            {
              headers: {
                'token': localStorage.getItem('token').replace("\"", "").replace("\"", ""),
                'channel': 'WEB'
              }
            }).then((res) => {
              console.log(res);
              if (res.data.code == 0 && res.data.data.rows.length) {
                this.setState({
                  ...this.state,
                  recieviers: this.state.recieviers.concat(res.data.data.rows),
                  action: STATS.reset,
                  index: this.state.index - 1
                });
              } else {
                this.setState({
                  ...this.state,
                  action: STATS.reset,
                  index: this.state.index - 1
                });
              }
            })
        })
      }
    }, 200)
    this.setState({
      action: STATS.loading
    })
  }
  handRefreshing (){//下拉刷新
    console.log(this.state.action);
    if(STATS.refreshing == this.state.action){
      return false
    }
   setTimeout(() => {
      // axios.get(lib.Api.memberURL + '/member/memberAddress/list?pageNum=' + this.state.pageNum + '&pageSize=' + this.state.pageSize,
      // {
      //   headers: {
      //     'token': localStorage.getItem('token').replace("\"", "").replace("\"", ""),
      //     'channel': 'WEB'
      //   }
      // }).then((res) => {
      //   if (res.data.code == 0 && res.data.data.rows.length) {
      //     console.log(res);
      //     //refreshing complete    
      //     this.setState({
      //       // data: cData,
      //       ...this.state,
      //       recieviers: res.data.data.rows,
      //       paddingTop:0,
      //       hasMore: true,
      //       action: STATS.refreshed,
      //       index: loadMoreLimitNum
      //     });
      //   }else if(res.data.code == 0 &&!res.data.data.rows.length){
      //     this.setState({
      //       ...this.state,
      //       paddingTop:0,
      //       hasMore:true,
      //       action: STATS.refreshed,
      //       index: loadMoreLimitNum            
      //     })
      //   }else{
      //     this.setState({
      //       ...this.state,
      //       paddingTop:0,
      //       hasMore:true,
      //       action: STATS.refreshed,
      //       index: loadMoreLimitNum            
      //     })
      //   }
      // });
      this.setState({
        ...this.state,
        paddingTop:0,
        hasMore:true,
        action: STATS.refreshed,
        index: loadMoreLimitNum            
      })
   }, 200);
    this.setState({
      action: STATS.refreshing
    })
  }
  render() {
    if (this.state.link_to_editAddress) {
      return <Redirect to='/member/editAddress' ></Redirect>
    } else if (this.state_link_createAddress) {
      return <Redirect to='/member/createAddress' ></Redirect>
    } else {
      return (
        <div className='addressManage-contiainer'>
          <ReactPullLoad
            downEnough={1000}
            isBlockContainer={true}
            action={this.state.action}
            handleAction={this.handleAction}
            hasMore={this.state.hasMore}
            style={{ paddingTop: this.state.paddingTop }}
            // HeadNode = {}
            // FooterNode = {}
            distanceBottom={1000}>
            <ul className='pull-container '>
              {this.state.recieviers.map((item, index) => {
                return (
                  <li key={index} className={index === 0 ? 'address-default' : 'address-detail'} >
                    <div className={index === 0 ? 'address-default' : 'address-detail'}>
                      <p className='title'>
                        <i>
                          <span className='user-name'>{item.name}</span>
                          <span className = 'default' style = {{display:item.isDefault == 0?'inline-block':'none'}}>[默认]</span>
                          <span className= 'alias' style = {{display:item.alias.length>0?'inline-block':'none'}}>{`[${item.alias}]`}</span>
                        </i>
                        <span>{item.phone}</span>
                      </p>
                      <p className='detail'>
                        {item.detailAddr}
                      </p>
                    </div>
                    <div className='address-operate'>
                      <div className='left' onClick={this.handlerSetDefault.bind(this, index, item.id)}>
                        <i>
                          <img className={(index === this.state.currentIndex) ? 'address-active' : 'address-no-active'} src={require('../../../assets/img/quanxuan_bt.png@2x.png')} alt='' />
                        </i>
                        <span>设为默认地址</span>
                      </div>
                      <div className='right'>
                        <i className='edit' onClick={this.link_to_editAddress.bind(this, item)}>
                          <img src={require('../../../assets/img/bianji.png')} alt='' />
                          <span>编辑</span>
                        </i>
                        <i onClick={this.deletAddress.bind(this, item.id, index)}>
                          <img src={require('../../../assets/img/gouwucheljitong_icon.png')} alt='' />
                          <span>删除</span>
                        </i>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </ReactPullLoad>
          <li id='address-plus'>
            <button className = 'btn' onClick={this.add_address.bind(this)}  >{this.state.text}</button>
          </li>
        </div>
      )
    }

  }
}