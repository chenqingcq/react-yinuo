import React, { Component } from 'react';
import Login from './components/member/login/login';

//个人中心
import AddressManage from './components/member/addressManage/addressManage';
import AddAddress from './components/member/addressManage/addAddress';
import AddNewAddress from './components/member/addressManage/addNewAddress';
import EditAddress from './components/member/addressManage/editAddress';
import CreateAddress from './components/member/addressManage/createAddress';
import Register from './components/member/myregister/register';
import RegisterByCode from './components/member/register/registerByCode';
import SetPayFirstTime from './components/member/register/setPay';
import Article from './components/member/article';

//商品相关
import GoodsDetail from './components/goods/goodsDetail/goodsDetail';

import Personinfo from './components/member/personalInfo';
import {Switch,Route,Redirect,Link,withRouter} from "react-router-dom";
import SetPay from './components/member/setPay/setPay';
import Index from './components/tab/index';
import My from './components/tab/my';
import { TabBar } from 'antd-mobile';
import './App.css'
import './assets/css/common.css'
import 'antd-mobile/dist/antd-mobile.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: localStorage.getItem('tab')?localStorage.getItem('tab'):'greenTab'
    }
  }
  render() {
    return (
    <div>
      <div className="App">
        <Switch>
          <Route path='/' exact component ={Login} ></Route>
          <Route path='/login' exact component ={Login} ></Route>
          <Route path = '/index'exact component={Index}></Route>
          <Route path = '/my' exact component={My}>
          </Route>
          <Route path = '/personinfo' exact component={Personinfo}/>
          <Route path = '/article' exact component={Article}/>
          <Route path = '/member/register' exact component={Register}></Route>          
          <Route path = '/member/addAddress' exact component={AddAddress}></Route>
          <Route path = '/member/registerByCode' exact component={RegisterByCode}></Route>
          <Route path = '/member/setPayFisrtTime' exact component={SetPayFirstTime}></Route>
          <Route path = '/member/addressManage' exact component={AddressManage }></Route>
          <Route path = '/member/addAddress' exact component={AddAddress }></Route>
          <Route path = '/member/addNewAddress' exact component={ AddNewAddress}></Route>
          <Route path = '/member/editAddress' exact component={ EditAddress}></Route>
          <Route path = '/member/createAddress' exact component={ CreateAddress}></Route>

          <Route path = '/goods/goodsDetail' exact component={ GoodsDetail}></Route>          
        </Switch>
      </div>
      <div style={{position:'absolute',bottom:0,width:'100%'}}>
      <TabBar tintColor={'#D30000'}>
         <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/xianshang_btn_weixuanzhong@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/xianshang_btn_xuanzhong@2x.png' }}
          title="首页"
          key="首页"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
            localStorage.setItem('tab','greenTab');
            this.props.history.push('/index');
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/fenlei_btn_weixuanzhong@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/fenlei_btn_xuanzhong@2x.png' }}
          title="分类"
          key="分类"
          selected={this.state.selectedTab === 'blackTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blackTab',
            });
            localStorage.setItem('tab','blackTab');
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/fujin_btn_weixuanzhong@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/fujin_btn_xuanzhong@2x.png' }}
          title="附近"
          key="附近"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
            localStorage.setItem('tab','yellowTab');
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/gouwuche_btn_xuanzhongcopy@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/gouwuche_btn_xuanzhong@2x.png' }}
          title="购物车"
          key="购物车"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
            localStorage.setItem('tab','blueTab');
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/wode_btn_weixuanzhong@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/wode_btn_xuanzhong@2x.png' }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'pinkTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'pinkTab',
            });
            this.props.history.push('/my');
            localStorage.setItem('tab','pinkTab');
          }}
        >
        </TabBar.Item>
      </TabBar>
      </div>
    </div>
    );
  }
}

export default withRouter(App);
// 