import React , {Component} from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import './index.less'
import { InputItem, WhiteSpace } from 'antd-mobile'
import axios from 'axios';
import HotRecommand from './hotRecommand';
const lib = require('../../utils/lib/lib.js');
var qs = require('qs');
export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            public:[],
        }
    }
    componentDidMount(){
      var params ={
        'belong':0,
        'skipType':0
      }
      axios.get(lib.Api.bossURL+'/boss/setAppMap/list',qs.stringify(params),
        {
          headers: {
              'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
          }
      }).then((res)=>{
         this.setState(
            Object.assign({}, { data:res.data.data }),
            (()=>{console.log(res.data.data)})
          )
      });
      axios.get(lib.Api.bossURL+'/boss/setAppNotice/list?type=1&pageNum=1&pageSize=20',
      {
        headers: {
            'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
        }
      }).then((res)=>{
          if(res.data.data){
             this.setState(
              Object.assign({}, { public:res.data.data.rows.length>=5?res.data.data.rows.slice(0,5):res.data.data.rows })
             )
            }
        })
    }
    render (){
        return (
          <div>
            <div className="searchBar">
              <img src={require('../../assets/img/saoyisao_btn@2x.png')} className="phone"/>
              <input type="text" placeholder="搜索商品/店铺"/>
              <img src={require('../../assets/img/消息提示@2x.png')} className="Msg"/>
            </div>
          <WingBlank>
          <Carousel
            autoplay={true}
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                id={val.id}
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={val.pic}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>
          <div className="category">
            <ul>
              <li><img src={require('../../assets/img/fenlei_btn@2x.png')}/><span>分类</span></li>
              <li><img src={require('../../assets/img/gouwuka_btn@2x.png')}/><span>流量包</span></li>
              <li><img src={require('../../assets/img/chexian_btn @2x.png')}/><span>车险</span></li>
              <li><img src={require('../../assets/img/chuizijihua_btn @2x.png')}/><span>签到</span></li>
              <li><img src={require('../../assets/img/zhucema_btn @2x.png')}/><span>注册码</span></li>
              <li><img src={require('../../assets/img/meirijignxuani_btn@2x.png')}/><span>每日精选</span></li>
              <li><img src={require('../../assets/img/koubeihaodian_btn@2x.png')}/><span>口碑好店</span></li>
              <li><img src={require('../../assets/img/chuizijihua_btn 1@2x.png')}/><span>锤子计划</span></li>
            </ul>
          </div>
          <div className="topMsg">
              <img src={require('../../assets/img/toutiao.png@2x.png')} className="top"/>
              <img src={require('../../assets/img/new.png@2x.png')} className="NewIcon"/>
              <WingBlank>
                  <Carousel className="my-carousel"
                    vertical
                    dots={false}
                    autoplay
                    infinite                  
                  >
                  {this.state.public.map(val => (
                         val.title=val.title.length>=10?val.title.substr(0,10)+'...':val.title,
                        <div className="v-item" key={val.title}>{val.title}</div>
                  ))}
                  </Carousel>
              </WingBlank>
              <img src={require('../../assets/img/more.png@2x.png')} className="more"/>
          </div>
          <div className="hot">
              <div className="item">
                <img />
                <div className="goodsDetail">
                <span className="goodsName">胜多负少东方搜发生的农夫根深蒂固</span>
                <span className="goodsPrice">￥223.00</span>
                </div>
              </div>
               <HotRecommand/>
          </div>
          </div>
          )
    }
}