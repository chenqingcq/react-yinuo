import React, {Component} from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, TextareaItem,Picker} from 'antd-mobile';
import { Icon,Toast} from 'antd-mobile';
import data from './area';
import Button from '../../../pages/button/button';
import './editAddress.less';
import axios from 'axios';
import {updateAdress} from './actions'
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
            isDefault:1,
            id:'',
            setTagText:'',
            userInputBtn:'确定',
            userInputBtnColor:'#D30000',
            region:data
        }
    }
    componentWillMount(){
      //  this.refs.userCode.focus();
      document.title = '修改地址';
      let item =JSON.parse( window.sessionStorage.getItem('editWitchAddreess'));
      let {phone , name , detailAddr,mergeName ,alias, id, isDefault} = item;
      console.log(item  );
        this.setState({
            ...this.state,
            phone:phone,
            userName : name,
            detailAddr:detailAddr,
            mergeName :mergeName ,
            id:id,
            alias:alias,
            isEditing:true,
            isDefault:isDefault
        });
    }
    componentDidMount(){
        this.refs.userInput.value = this.state.alias; 
        this.confirmEdit()       
    }
    handlerSetDefault(index){
      console.log(index);
      this.setState({
        ...this.state,
        currentIndex:index
      })
    }
    selectTag(index,content,e){
        console.log(e.target,index,content);
        if(index !==3){
            if(e.target.className =='tag-active' ){//设置alias
                this.setState({
                    ...this.state,
                    alias:content,
                })
            }else {
                this.setState({
                    ...this.state,
                    alias:''
                })
            }
        }
        
        setTimeout(()=>{
            this.setState({
                ...this.state,
                tagCurrentIndex:index,                
            })
        })
        if(this.refs.userInput.classList.contains('userInput-active')){
            this.refs.userInput.classList.remove('userInput-active');
        }
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
        console.log('check');
        console.log(this.state.userName,this.state.phone,this.state.address);
        if(!this.state.userName)  {
            Toast.info('请输入用户名',1);   
            return         
        }
        if(!this.state.phone.trim())  {
            Toast.info('请输入手机号',1);   
            return         
        }
        var exp =/^[1][3,4,5,7,8][0-9]{9}$/;  
        if(!exp.test(this.state.phone)){
            Toast.info('您输入的手机号格式有误',2);
            return
        }     
        if(!this.state.mergeName){
            Toast.info('请输入地区信息',1);  
            return;          
        } 
        if(!this.state.detailAddr){
            Toast.info('请输入详细地址',1);    
            return;        
        };
        console.log(this.state);
        // return;
        // updateAdress({
        //     id:this.state.id,
        //     name:this.state.userName,
        //     phone:this.state.phone,
        //     mergeName:this.state.mergeName,
        //     detailAddr:this.state.detailAddr,
        //     alias:this.state.alias,
        //     isDefault: this.state.isDefault? 0: 1
        // })
        axios.post(lib.Api.memberURL+'/member/memberAddress/update',qs.stringify(
            {
                id:this.state.id,
                name:this.state.userName,
                phone:this.state.phone,
                mergeName:this.state.mergeName,
                detailAddr:this.state.detailAddr,
                alias:this.state.alias,
                isDefault: this.state.isDefault? 0: 1 
            }
        ), {
            headers: {
              'token': localStorage.getItem('token').replace("\"","").replace("\"",""),
              'channel': 'Android'
            }
          })
        .then((res)=>{
            console.log(res)
            if(res.data.code ==0){
                Toast.info('修改成功!',1);
                this.props.history.push('/member/addressManage')
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
        console.log(e.target);
        //  清除tags-active样式
        let activeBtn = document.querySelector('.tag-active');
        console.log(activeBtn)
        if(activeBtn){
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
             }      
        }   
    }
    setRegion(v){
         this.setState({...this.state, visible: false ,mergeName:v})
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
                value = {this.state.mergeName}
                defaultValue =  {this.state.mergeName }
                onClick = {this.selectArea.bind(this)}
                placeholder="地区信息"
            >地区信息
            <Picker
                visible={this.state.visible}
                data={this.state.region}
                // data = {this.state.region}
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
                                <div style = {{opacity:!this.state.isEditing ? 1:0}} className = {index === this.state.tagCurrentIndex?'tag-active':'tag-detail-last' }  onClick = {this.selectTag.bind(this,index,item)} key={index}>{item}</div>                                
                            )
                        }else if (index>3){
                            return (
                                <div   className = {(  this.state.alias ||index === this.state.tagCurrentIndex)?'tag-active':'tag-detail' }  onClick = {this.selectTag.bind(this,index,item)} key={index}>{item}</div>
                            )
                        }else{
                            return (
                                <div   className = {(index === this.state.tagCurrentIndex)?'tag-active':'tag-detail' }  onClick = {this.selectTag.bind(this,index,item)} key={index}>{item}</div>
                            )
                        }  
                    })}                
                  </div>
                </li>
                <p id ='userInuptEditAddress' style={{display:this.state.isEditing ? 'block':'none'}}>
                    <input onClick= {this.handerUserInput.bind(this)} onFocus = {this.editUserInput.bind(this)} onChange = {this.getInputText.bind(this)} ref='userInput' placeholder = '设置标签名称' maxLength = {5} type='text'/>
                    <button onClick ={this.confirmEdit.bind(this)} className = {'confirm-edit'} style = {{background: this.refs.userInput &&this.refs.userInput.value ?this.state.userInputBtnColor : '#ccc'}}>{this.state.userInputBtn}</button>
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
