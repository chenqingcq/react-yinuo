import React , {Component} from 'react'
import { Carousel, WingBlank,InputItem,WhiteSpace  } from 'antd-mobile';
import './index.less'
import axios from 'axios';
import {Link} from 'react-router-dom';
import HotRecommand from './hotRecommand';
const lib = require('../../utils/lib/lib.js');
var qs = require('qs');
export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[1,2,3],
            public:[{title:'您'},{title:'您'}],
            recommand:[],
        }
    }
    componentDidMount(){  
      var TabBar =document.querySelector('.am-tabs-tab-bar-wrap');
      TabBar.style.display='block'; 
      //判断是否登录
      var personinfo = localStorage.getItem('personinfo');
      if(!personinfo){
        this.props.history.push('login');
      }
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
        console.log(res)
         this.setState(
            Object.assign({}, { data:res.data.data.length>=8?res.data.data.slice(0,8):res.data.data}),
            (()=>{console.log(res.data.data)})
          )
      });
      axios.get(lib.Api.bossURL+'/boss/setAppNotice/list?type=1&pageNum=1&pageSize=10',
      {
        headers: {
            'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
        }
      }).then((res)=>{
          if(res.data.data){
             this.setState(
              Object.assign({}, { public:res.data.data.rows.length>=5?res.data.data.rows.slice(0,5):res.data.data.rows})
             )
            }
        })
      axios.get(lib.Api.bossURL+'/boss/bossAd/list?belong=0&pageNum=1&pageSize=10',{
        headers: {
          'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
        }
      }).then((res)=>{
        console.log(res)
         if(res.data.data.rows){
            this.setState({
              recommand:res.data.data.rows
            })
         }
      })
    }
    render (){
        return (
          <div>
            <div className="searchBar">
              <img src={require('../../assets/img/saoyisao_btn@2x.png')} className="phone"/>
              <input type="text" placeholder="搜索商品/店铺"/>
              <img src={require('../../assets/img/xiaoxi_btn@2x.png')} className="Msg"/>
            </div>
          <WingBlank>
          {/* <Carousel 
            autoplay
            frameOverflow="visible"
            autoplayInterval={1000}
            infinite
            dotStyle={{background:"#fff"}}
            dotActiveStyle={{background:"#d30000"}}
          >
            {this.state.data.map(val => (
              <a
                key={val.id}
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
          </Carousel> */}
          <Carousel className="space-carousel"
          frameOverflow="visible"
          autoplay
          infinite
          dotStyle={{background:"#fff"}}
          dotActiveStyle={{background:"#d30000"}}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.data.map((val, index) => (
            <a
              key={val}
                style={{
                display: 'block',
                height: this.state.imgHeight,
              }}
            >
               <Link to={`/goods/goodsDetail:${val.id}`}><img
                src={val.pic}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              /></Link>
            </a>
          ))}
        </Carousel>
        </WingBlank>
          <div className="category">
            <ul>
              <li><img src={require('../../assets/img/fenlei_btn@2x.png')}/><span>分类</span></li>
              <li><img src={require('../../assets/img/zhucema_btn @2x.png')}/><span>注册码</span></li>
              <li><img src={require('../../assets/img/meirijignxuani_btn@2x.png')}/><span>每日精选</span></li>
              <li><img src={require('../../assets/img/chuizijihua_btn 1@2x.png')}/><span>锤子计划</span></li>
              <li><img src={require('../../assets/img/chuizijihua_btn @2x.png')}/><span>签到</span></li>
            </ul>
          </div>
          <div className="topMsg">
              <img src={require('../../assets/img/toutiao.png@2x.png')} className="top"/>
              <img src={require('../../assets/img/new.png@2x.png')} className="NewIcon"/>
              <WingBlank>
                  <Carousel className="my-carousel"
                    vertical
                    dots={false}
                    autoplayInterval={1000} 
                    autoplay
                    infinite                 
                  >
                  {this.state.public.map(val => (
                         val.title=val.title?(val.title.length>=10?val.title.substr(0,10)+'...':val.title):'',
                        <div className="v-item" key={val.title}>{val.title}</div>
                  ))}
                  </Carousel>
              </WingBlank>
              <img src={require('../../assets/img/more.png@2x.png')} className="more"/>
          </div>
          <div className="hot">
             { this.state.recommand.map(val=>{
                 return(
                  <div className="item" key={val.id}>
                    <Link to={`/goods/goodsDetail:${val.id}`}><img src={val.pic} style={{width:'100%'}}/></Link>
                    <div className="goodsDetail">
                    <span className="goodsName">{val.subject?(val.subject.length>=20?val.subject.substr(0,20)+'...':val.subject):''}</span>
                    <span className="goodsPrice">{val.subTitle}</span>
                    </div>
                  </div>
                 )
             })
             }  
               <HotRecommand/>
          </div>
          </div>
          )
    }
}