import React from 'react';
import axios from 'axios';
import qs from 'qs'

import './tab.less'
const lib = require('../../../utils/lib/lib.js');

class Tab extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentWillMount(){

    }
    componentDidMount(){
    }
    goodsCollect(e){
        // if(e.)
    }
    render(){
        return (
            <div className='goods-tab-container'>
                <div className ='left'>
                    <span className ='person-service'>
                        <img src = {require('../../../assets/img/pserson-service@2x.png')} alt=''/>
                    </span>
                    <span  className ='collect' onClick={this.goodsCollect.bind(this)}>
                        <img  src = {require('../../../assets/img/nocollect@2x.png')} alt=''/>                        
                    </span>
                    <span className ='cart'>
                        <img src = {require('../../../assets/img/cart@2x.png')} alt=''/>                                                
                    </span>
                </div>
                <div className ='right'>
                    <div className ='addToCart'>
                        加入购物车
                    </div>
                    <div className='buybuybuy'>
                        立即购买
                    </div>
                </div>
            </div>
        )
    }
}
export default Tab