import React ,{Component } from "react";
import { TabBar } from 'antd-mobile';
import './entry.less'

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  render() {
    return (
      <div style={ { position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#D30000"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={
                { uri:require('../../assets/img/xianshang_btn_weixuanzhong@2x.png') }                
            }
            selectedIcon={
                { uri:require('../../assets/img/xianshang_btn_xuanzhong@2x.png') }                                
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('首页')}
          </TabBar.Item>
          <TabBar.Item
            icon={
                { uri:require('../../assets/img/fenlei_btn_weixuanzhong@2x.png') }
            }
            selectedIcon={
                // fenlei_btn_xuanzhong@2x
                { uri:require('../../assets/img/fenlei_btn_xuanzhong@2x.png') }            
            }
            title="分类"
            key="Koubei"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('Koubei')}
          </TabBar.Item>
          <TabBar.Item
            icon={
                { uri:require('../../assets/img/fujin_btn_weixuanzhong@2x.png') }                                             
            }
            selectedIcon={
                { uri:require('../../assets/img/fujin_btn_xuanzhong@2x.png') }                                                             
            }
            title="附近"
            key="Friend"
            // dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('附近')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: require('../../assets/img/gouwuche_btn_weixuanzhong@2x.png') }}
            selectedIcon={{ uri: require('../../assets/img/gouwuche_btn_xuanzhong@2x.png') }}
            title="购物车"
            key="shop"
            badge={3}            
            selected={this.state.selectedTab === 'shop'}
            onPress={() => {
              this.setState({
                selectedTab: 'shop',
              });
            }}
          >
            {this.renderContent('购物车')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri:require('../../assets/img/wode_btn_weixuanzhong @2x.png') }}
            selectedIcon={{ uri:require('../../assets/img/wode_btn_xuanzhong@2x.png')  }}
            title="我的"
            key="member"
            selected={this.state.selectedTab === 'member'}
            onPress={() => {
              this.setState({
                selectedTab: 'member',
              });
            }}
          >
            {this.renderContent('我的')}
          </TabBar.Item>
        </TabBar>
        
      </div>
    );
  }
}
