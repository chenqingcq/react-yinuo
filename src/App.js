import React, { Component } from 'react';
//登录
import Login from './components/member/login/login';
import LoginQrcode from './components/member/qrcode/qrcode';


//个人中心
import AddressManage from './components/member/addressManage/addressManage';
import AddAddress from './components/member/addressManage/addAddress';
import AddNewAddress from './components/member/addressManage/addNewAddress';
import EditAddress from './components/member/addressManage/editAddress';
import CreateAddress from './components/member/addressManage/createAddress';
import Register from './components/member/myregister/register';
import SetLoginPass  from './components/member/register/register';
import RegisterByCode from './components/member/register/registerByCode';
import SetPayFirstTime from './components/member/register/setPay';
import Article from './components/member/article';
import Protocol from './components/member/protoc';
import Msg from './components/member/msg/msg';
//商品相关
import GoodsDetail from './components/goods/goodsDetail/goodsDetail';
import GoodsAllComments from './components/goods/comments/comments';
import ConfirmOrder from './components/goods/confirmOrder/confirmOrder';
import Cart from './components/tab/cart';
import Personinfo from './components/member/personalInfo';
import {Switch,Route,Redirect,Link,withRouter} from "react-router-dom";
import SetPay from './components/member/setPay/setPay';

//Tab页
import SearchGoods from './components/tab/search/search'
import Index from './components/tab/index';
import My from './components/tab/my';
import { TabBar } from 'antd-mobile';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab:'greenTab'
    }
  }
  render() {
    return (
    <div>
      <div className="App">
        <Switch>
          <Route path='/' exact component ={Login} ></Route>
          <Route path='/login' exact component ={Login} ></Route>
          <Route path='/login/qrcode' exact component ={LoginQrcode} ></Route>
          <Route path = '/index'exact component={Index}></Route>
          <Route path = '/my' exact component={My}></Route>
          <Route path = '/searchGoods' exact component={SearchGoods}></Route>
          <Route path = '/cart' exact component={Cart}></Route>
          <Route path = '/personinfo' exact component={Personinfo}/>
          <Route path = '/article' exact component={Article}/>
          <Route path = '/protocol' exact component={Protocol}/>
          <Route path = '/member/register' exact component={Register}></Route>             
          <Route path = '/member/setLoginPass' exact component={ SetLoginPass  }></Route>
          <Route path = '/member/registerByCode' exact component={RegisterByCode}></Route>
          <Route path = '/member/setPayFisrtTime' exact component={SetPayFirstTime}></Route>
          <Route path = '/member/addressManage' exact component={AddressManage }></Route>
          <Route path = '/member/addNewAddress' exact component={ AddNewAddress}></Route>
          <Route path = '/member/editAddress' exact component={ EditAddress}></Route>
          <Route path = '/member/createAddress' exact component={ CreateAddress}></Route>
          <Route path = '/member/Msg' exact component={ Msg}></Route>
          <Route path = '/goods/goodsDetail:goodsId' exact component={ GoodsDetail}></Route>          
          <Route path = '/goods/goodsAllComments' exact component={GoodsAllComments }></Route>          
          <Route path = '/goods/confirmOrder' exact component={ConfirmOrder}></Route>          
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
            this.props.history.push('/index');
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
            this.props.history.push('/cart');
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