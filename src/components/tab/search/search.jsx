import React ,{Component} from 'react';

import './search.less'

export default class Search extends Component {
    constructor(){
        super();
        this.state = {
            currentIndex:0,
            searchItems:[
                '商品',
                "店铺"
            ]
        }
    }
    componentWillMount(){
        document.title = "搜索";
    }
    changeIndex(index){
        console.log(index)
        this.setState({
            ...this.state,
            currentIndex :index
        })
    }
    render(){
        return (
            <div className ='search-container'>
                <div className='search-panel'>
                   <div className='_search'>
                        <label htmlFor='search-goods'>
                            <img alt ='' src={require('../../../assets/img/sousuo_btn@2x.png')} />                        
                        </label>
                        <input id='search-goods' placeholder='搜索商品' maxLength = {20}/>
                   </div>
                    <span className ='search-btn'>搜索</span>
                </div>
               <ul className ='type'>
                   {
                       this.state.searchItems.map((item,index)=>{
                           return (
                               <li  key = {index} onClick = {this.changeIndex.bind(this,index)}>
                                   <span className = {index == this.state.currentIndex? "search-active":'search-inactive'}>{item}</span>
                               </li>
                           )
                       })
                   }
               </ul>
                <div className='hot-search'>
                   <span>热搜</span>
                    <ul>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品eeee</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品eeee</li>
                        <li>商品</li>
                        <li>商品</li>
                    </ul>
                </div>
                <div className='history-panel'>
                  <ul>
                      <li>雅诗兰黛</li>
                      <li>雅诗兰黛</li>
                      <li>雅诗兰黛</li>
                      <li>雅诗兰黛</li>
                      <li>雅诗兰黛</li>
                      <li>雅诗兰黛</li>
                      <li>雅诗兰黛</li>
                  </ul>
                </div>
                <div className='clear-history'>
                    <img src={require('../../../assets/img/shanchu_icon@2x.png')} alt=''/>
                    <span>清除历史</span>
                </div>
            </div>
        )
    }
}