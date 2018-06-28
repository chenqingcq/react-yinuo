import React, {Component} from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, TextareaItem,Picker} from 'antd-mobile';
import { Icon,Toast} from 'antd-mobile';
import data from './area';
import Button from '../../../pages/button/button';
import './editAddress.less';
import {createAdress} from './actions'
import axios from 'axios';
const lib = require('../../../utils/lib/lib.js');
var qs = require('qs');
console.log(data)
 class EditAddress extends Component {
    constructor(props){
        super(props);
        this.state= {
            text:'保存',
            tags:['家','公司','学校','+' ],
            tagCurrentIndex:-1,
            visible:false,//选择器
            pickerValue:'',
            userName:'',
            phone:'',
            address:'',
            isDefault:false,
            alias:'',
            detailAddr:'',
            mergeName:'',
            id:'',
            setTagText:'',
            userInputBtn:'确定',
            userInputBtnColor:'#D30000',
            region:data
        }
    }
    componentWillMount(){
      //  this.refs.userCode.focus();
      document.title = '新增地址';
    }
    handlerSetDefault(index){
      console.log(index);
      this.setState({
        ...this.state,
        currentIndex:index
      })
    }
    selectTag(index,content,e){
        console.log(e.target.className,index,content);
        if(index !=3){
            if(e.target.className =='tag-active'){//设置alias                
                this.setState({
                    ...this.state,
                    alias:''
                })
            }else{
                console.log('////',content)                
                this.setState({
                    ...this.state,
                    alias:content
                })
            }
        }
       
        if(this.refs.userInput &&this.refs.userInput.classList.contains('userInput-active')){
            this.refs.userInput.classList.remove('userInput-active');
        }//清除输入active样式
        setTimeout(()=>{
            if(index === 3){
                this.setState({
                    ...this.state,
                    tagCurrentIndex:index,
                    isEditing:true
                })
            }else{
                this.setState({
                    ...this.state,
                    tagCurrentIndex:index,
                })
            };
            console.log(this.state)            
        })
    }
    setAsDefault(e){
        console.log(this.refs.setAsDefault)
        if(!this.refs.setAsDefault.classList.contains('address-active')){
            this.refs.setAsDefault.classList.remove('address-active-no');                        
            this.refs.setAsDefault.classList.add('address-active');
            this.setState({
                ...this.state,
                isDefault:true
            })
        }else{
            this.refs.setAsDefault.classList.add('address-active-no');                        
            this.refs.setAsDefault.classList.remove('address-active'); 
            this.setState({
                ...this.state,
                isDefault:false
            })           
        }
    }
    selectArea(v){
        console.log(v);
        let arr = this.state.region.filter((value,i,a)=>{
            return value.value == v[0]
        })
        console.log(arr)
        this.setState({
            ...this.state,
            visible:true,
        })
    }
    confirmEdit(){
        console.log(this.refs.userInput.value);
        if(this.refs.userInput.value){
             // this.refs.userInput.type = 'button';
             this.setState({
                ...this.state,
                userInputBtn:'编辑',
                userInputBtnColor:'#333'
            });
            this.refs.userInput.disabled="disabled";
            this.refs.userInput.style.fontSize = '14px';
            this.refs.userInput.style.width = '70px';
        }
        if(this.state.userInputBtnColor ==='#333'){
            this.setState({
                ...this.state,
                userInputBtn:'确定',
                userInputBtnColor:'#D30000'
            });
            this.refs.userInput.disabled= false;
            this.refs.userInput.style.width = '155px';
        }
    }
    setPhone(val){     
        this.setState({
            ...this.state,
            phone:val
        })
        
    }
    setName(val){
        console.log(val)
        this.setState({
            ...this.state,
            userName:val            
        })
    }
    checkUserInput(){
        console.log(this.state);
        console.log(this.state.userName,this.state.phone,this.state.address);
        if(!this.state.userName)  {
            Toast.info('请输入用户名',1);   
            return         
        }
        if(!this.state.phone.trim())  {
            Toast.info('请输入手机号',1);   
            return         
        }
        var exp =/^[1][3,4,5,7,8,9][0-9]{9}$/;  
        if(!exp.test(this.state.phone)){
            Toast.info('您输入的手机号格式有误',2);
            return
        }     
        if(!this.state.pickerValue){
            Toast.info('请输入地区信息',1);  
            return;          
        } 
        if(!this.state.detailAddr){
            Toast.info('请输入详细地址',1);    
            return;        
        };
        // createAdress({
        //     name:this.state.userName,
        //     phone:this.state.phone,
        //     mergeName:this.state.pickerValue,
        //     detailAddr:this.state.detailAddr,
        //     alias:this.state.alias,
        //     isDefault:this.state.isDefault?0:1
        // })

        axios.post(lib.Api.memberURL+'/member/memberAddress/create',qs.stringify(
            {
                    name:this.state.userName,
                    phone:this.state.phone,
                    mergeName:this.state.mergeName,
                    detailAddr:this.state.detailAddr,
                    alias:this.state.alias,
                    isDefault:this.state.isDefault?0:1
            }
        ), {
            headers: {
              'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
              'channel': 'Android'
            }
          }).then((res)=>{
            console.log(res)
            if(res.data.code ==0){
                Toast.info('添加成功!',1);
                this.props.history.push('/member/addressManage')
            }else{
                Toast.info(res.data.errorMsg,1);                
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    getInputText(e){
        this.setState({
            ...this.state,
            setTagText:e.target.value
        })
    }
    editUserInput(){
        this.setState({
            ...this.state,
            userInputBtnColor:'#D30000',
            userInputBtn:'确定'                  
        })
    }
    handerUserInput(e){
        console.log(e.target.value);
       
        let activeBtn = document.querySelector('.tag-active');
        if(activeBtn){//  清除tags-active样式
            activeBtn.classList.remove('tag-active');
            activeBtn.classList.add('tag-detail');
        }  
        if(this.state.userInputBtnColor === '#333'){//处于编辑状态
             if(e.target.classList.contains('userInput-active')){
                e.target.classList.remove('userInput-active');
                this.setState({
                    ...this.state,
                    alias:''
                })
             }else{
                e.target.classList.add('userInput-active'); 
                this.setState({
                    ...this.state,
                    alias:e.target.value
                })                
             }  ;
        }   
    }
    setRegion(v){
        let ProvinceCode =  v[0];
        let CityCode =  v[1];
        let RegionCode =  v[2];
        let ProvItem = data.filter((item)=>{
            return item.value == ProvinceCode
        })
        let CityItem = ProvItem[0].children.filter((item)=>{
            return item.value == CityCode
        })
        let RegionItem =CityItem[0].children.filter((item)=>{
            return item.value == RegionCode
        })
        console.log(ProvinceCode,CityCode,RegionCode,ProvItem[0].label,CityItem[0].label,RegionItem[0].label,data);
        let mergeName = [ProvItem[0].label,CityItem[0].label,RegionItem[0].label].join(',')
         this.setState({...this.state, visible: false ,mergeName:mergeName,pickerValue:mergeName})
    }
    setDetailAddress(v){
        this.setState({...this.state, detailAddr:v})
    }
    render(){
    const { getFieldProps } = this.props.form;
      return(
        <List>
        <div className = 'addressManage-contiainer-'>
          <ul>
            <List>
            <InputItem
                // {...getFieldProps('control')}        
                placeholder="姓名"
                onChange = {this.setName.bind(this)}
                defaultValue = {this.state.userName}
            >收货人
            </InputItem>
            <InputItem
                placeholder="11位手机号"
                data-seed="logId"
                type='number'
                defaultValue = {this.state.phone}
                pattern = "/^[1][3,4,5,7,8][0-9]{9}$/"
                maxLength = {11}
                onChange = {this.setPhone.bind(this)}
            >手机号码
            </InputItem>
            <div className='editAddressIcon'>
             <InputItem
                // {...getFieldProps('preice')}
                value = {this.state.pickerValue}
                defaultValue =  {this.state.mergeName }
                onClick = {this.selectArea.bind(this)}
                placeholder="地区信息"
            >地区信息
            <Picker
                itemStyle= {{fontSize:13}}
                visible={this.state.visible}
                data={this.state.region}
                onChange={()=>{}}
                onOk={this.setRegion.bind(this)}
                onDismiss={() => this.setState({ visible: false })}
            />

             <div className='icon'><Icon type='right' /></div>
            </InputItem>
            </div>
            <TextareaItem
            placeholder="详细地址"          
            title ='详细地址'
            onBlur = {this.setDetailAddress.bind(this)}
            defaultValue =  {this.state.detailAddr}                            
            rows = {5}
          />    
         </List>
          </ul>
          <ul className='tags-container'>
              <li>
                  <div className='tags'>标签:</div>
                  <div className='tags-btn'>
                    {this.state.tags.map((item,index,arr)=>{
                        if(index === 3 ){
                            return (
                                <div style = {{display:!this.state.isEditing ? 'block':'none'}} className = {index === this.state.tagCurrentIndex?'tag-active':'tag-detail-last' }  onClick = {this.selectTag.bind(this,index,item)} key={index}>{item}</div>                                
                            )
                        }else{
                            return (
                                <div   className = {index === this.state.tagCurrentIndex?'tag-active':'tag-detail' }  onClick = {this.selectTag.bind(this,index,item)} key={index}>{item}</div>
                            )
                        }     
                    })}                
                  </div>
                </li>
                <p id ='userInuptEditAddress' style={{display:this.state.isEditing ? 'block':'none'}}>
                    <input onClick= {this.handerUserInput.bind(this)} onFocus = {this.editUserInput.bind(this)} onChange = {this.getInputText.bind(this)} ref='userInput' placeholder = '设置标签名称' maxLength = {5} type='text'/>
                    <button onClick ={this.confirmEdit.bind(this)} className = {'confirm-edit'} style = {{background:this.state.setTagText.length? this.state.userInputBtnColor : '#ccc'}}>{this.state.userInputBtn}</button>
                </p>
          </ul>
          <p className='setasdefault' onClick = {this.setAsDefault.bind(this)}>
             <i>
                 <img ref='setAsDefault' className= 'address-active-no'  src={require('../../../assets/img/quanxuan_bt.png@2x.png')} alt='' />
            </i>
            <span>设为默认地址</span>
          </p>
          <div className='plus'>
            <Button handlerClick= {this.checkUserInput.bind(this)} styleSheet = {{background:'#D30000',color:'#fff',width:'90%'}}  text={this.state.text} />            
          </div>
        </div>
        </List>
      )
    }
}
 EditAddress = createForm()(EditAddress);
 export default EditAddress;
