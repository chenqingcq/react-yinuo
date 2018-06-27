import React ,{Component} from "react";
import {Toast} from 'antd-mobile';
import QRCode from 'qrcode';
import axios from 'axios';
import qs from'qs';

import './qrcode.less';
const lib = require('../../../utils/lib/lib.js');
class Qrcode extends Component {
    constructor(){
        super();
        this.state= {
            phone:'',
            hasCanvas:false
        }
    }
    componentDidMount(){
        document.title = '二维码';
    }
    userInputPhone(e){
        this.setState({
            phone:e.target.value
        })
    }
    createQrcode(){
        console.log(this.state.phone)
        let  exp =/^[1][3,4,5,7,8,9][0-9]{9}$/;    
        if(!this.state.phone.trim().length){
            Toast.info('请输入手机号',1);
            return;
        }  
        if(!exp.test(this.state.phone)){
            Toast.info('手机号格式不对',1);
            return;
        };   
        //
        axios.get(lib.Api.memberURL+'/member/memberInfo/getByPhone?phone='+this.state.phone,
        // qs.stringify(Param),
        {
            headers: {
                'channel': 'WEB'
            }
        }
        ).then((res)=>{
            console.log(res);
            if(res.data.code == 0  ){
                // if(!this.state.hasCanvas){
                    QRCode.toCanvas(`http://www.baidu.com?phone=${this.state.phone}`, { errorCorrectionLevel: 'H' },  (err, canvas)=> {
                        if (err) throw err;       
                        var container = document.getElementById('container')
                        container.appendChild(canvas);
                        this.setState({
                            ...this.state,
                            hasCanvas:true
                        })
                    })
                // }
            }else{
                Toast.info(`${res.data.errorMsg},请先注册 `,2);
            }
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div className='qrcode-container'>
                <div className='qrcode-panel'>
                    <div className='logo'  ref='qrcode'>
                        <div className='logo-container' id = 'container'>
                            <span style={{display:!this.state.hasCanvas?'block':'none'}}>二维码区域</span>
                        </div>
                    </div>
                    <div className='thumb'>在下方<img src={require('../../../assets/img/thumb@2x.png')}/>输入手机号立即生成二维码</div>
                </div>
                <div className='user-phone'>
                    <label htmlFor='phone'>
                        <img alt='' src={require('../../../assets/img/phone@2x.png')} />
                    </label>
                    <input id='phone'  onChange = {this.userInputPhone.bind(this)}  type='text' placeholder='请输入手机号'>
                    </input>
                </div>
                <div className='create' onClick= {this.createQrcode.bind(this)}>生成</div>
            </div>
        )
    }
}
export default Qrcode;