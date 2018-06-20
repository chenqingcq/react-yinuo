import React, { Component } from 'react';
import Test from './test';
import {Link,Route} from 'react-router-dom';
import './tab.less'
export default class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:0
        }
    }
    render() {
        return (
            <div className='tab-container'>
                <img src={require('../../assets/img/fanhui_btn@2x.png')} alt=""/>
                <span className='title'>{this.props.nav.title}</span>
                <Route path= '/test' component ={ Test}>
                   
                </Route>
                <Link to ={`/register/${this.state.id}`}>
                    <span onClick={this.props.handlerOperate} className='operate'>{this.props.nav.operate}</span>                    
                </Link>
            </div>
        )
    }
}