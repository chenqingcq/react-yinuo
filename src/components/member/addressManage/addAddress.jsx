import React, {Component} from 'react';
import Tab from '../../../pages/tab/tab';
import Button from '../../../pages/button/button';
import {Picker, List, InputItem, WhiteSpace } from 'antd-mobile';
import Dialog from '../../../pages/toast/toast';
import arrayTreeFilter from 'array-tree-filter';
import { district, provinceLite } from 'antd-mobile-demo-data';
import './addressMange.less'
import axios from 'axios';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          cols: 1,
          pickerValue: [],
          visible: false,
          district:[]
        };
    }
    componentDidMount(){
      console.log(district)
       var params =localStorage.getItem('token');
       axios.get(lib.Api.bossURL+'/boss/setAreaCode/listProvinces',qs.stringify(params)).then((res)=>{
         console.log(res)
           if(res.data.data){
               this.setState({
                district:res.data.data
               })
             }
       })
    }
    getSel() {
      const value = this.state.pickerValue;
      if (!value) {
        return '';
      }
      const treeChildren = arrayTreeFilter(this.state.district, (c, level) => c.value === value[level]);
      return treeChildren.map(v => v.label).join(',');
    }
    render(){
      return(
        <List>
          <InputItem
            clear
            placeholder="姓名"
            ref={el => this.autoFocusInst = el}
            maxLength ='10'
          >收货人</InputItem>
          <InputItem
            clear
            placeholder="11位手机号"
            ref={el => this.inputRef = el}
            maxLength ='11'
          >手机号码</InputItem>
            <Picker
            visible={this.state.visible}
            value={this.state.pickerValue}
            data={district}
            onChange={v => this.setState({ pickerValue: v})}
            onOk={() => this.setState({ visible: false })}
            onDismiss={() => this.setState({ visible: false })}
          >
            <List.Item extra={this.getSel()}  onClick={() => this.setState({ visible: true })}>
              地区信息
            </List.Item>
          </Picker>
          <InputItem className='street'
            clear
            placeholder="具体街道"
            ref={el => this.inputRef = el}
            maxLength ='24'
          >详细地址</InputItem>
        </List>

      )
    }
}