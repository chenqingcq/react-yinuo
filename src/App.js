import React, { Component } from 'react';
import Login from './components/member/login/login';


import AddressManage from './components/member/addressManage/addressManage';
import AddAddress from './components/member/addressManage/addAddress';
import AddNewAddress from './components/member/addressManage/addNewAddress';
import EditAddress from './components/member/addressManage/editAddress';
import CreateAddress from './components/member/addressManage/createAddress';
import Register from './components/member/myregister/register';
import RegisterByCode from './components/member/register/registerByCode';
import SetPayFirstTime from './components/member/register/setPay';


import Personinfo from './components/member/personalInfo';
import {Switch,Route,Redirect,Link,withRouter} from "react-router-dom";
import SetPay from './components/member/setPay/setPay';
import Index from './components/tab/index';
import My from './components/tab/my';
import { TabBar } from 'antd-mobile';
// import mui from './assets/mui/mui.js';//mui  

import './App.css'
import 'antd-mobile/dist/antd-mobile.css';
//import './assets/mui/mui.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'greenTab'
    }
  }
  render() {
    return (
    <div>
      <div className="App">
        <Switch>
          <Route path='/' exact component ={Index} ></Route>
          <Route path = '/login' component={Login}></Route>
          <Route path = '/addressMange' component={AddressManage}></Route>
          <Route path = '/index' component={Index}></Route>
          <Route path = '/my' component={My}>
          </Route>
          <Route path = '/personinfo' component={Personinfo}/>

          <Route path = '/member/register' component={Register}></Route>          
          <Route path = '/member/addAddress' component={AddAddress}></Route>
          <Route path = '/member/registerByCode' component={RegisterByCode}></Route>
          <Route path = '/member/setPayFisrtTime' component={SetPayFirstTime}></Route>
          <Route path = '/member/addressManage' component={AddressManage }></Route>
          <Route path = '/member/addAddress' component={AddAddress }></Route>
          <Route path = '/member/addNewAddress' component={ AddNewAddress}></Route>
          <Route path = '/member/editAddress' component={ EditAddress}></Route>
          <Route path = '/member/createAddress' component={ CreateAddress}></Route>

        </Switch>
      </div>
      <div style={{position:'absolute',bottom:0,width:'100%'}}>
      <TabBar>
         <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/xianshang_btn_weixuanzhong@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/xianshang_btn_xuanzhong@2x.png' }}
          title="����"
          key="����"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
            });
            this.props.history.push('/index');
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/fujin_btn_weixuanzhong@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/fujin_btn_xuanzhong@2x.png' }}
          title="线下"
          key="线下"
          title="����"
          key="����"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/gouwuche_btn_xuanzhongcopy@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/gouwuche_btn_xuanzhong@2x.png' }}
          title="购物车"
          key="购物车"
          title="���ﳵ"
          key="���ﳵ"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/wode_btn_weixuanzhong@2x.png' }}
          selectedIcon={{ uri: 'http://www.yinuoshangcheng.com/yinuo/img/wode_btn_xuanzhong@2x.png' }}
          title="我的"
          key="我的"
          title="�ҵ�"
          key="�ҵ�"
          selected={this.state.selectedTab === 'pinkTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'pinkTab',
            });
            this.props.history.push('/my');
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