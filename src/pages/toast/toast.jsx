import React from 'react';
import './toast.less'
export default class Toast extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShowModal :true
        }
    }
    closeModal(){
        this.props.closeModal();
    }
    render(){
        if(this.props.isProc ){
            return (
                <div onClick = {this.closeModal.bind(this)} ref='modal' style = {{display:this.props.isShowToast ? 'block':'none'}} className='modal-container'>
                     <div className = 'modal'>
                        {this.props.toastText }
                     </div>
                </div>
            )
        }else{
            return (
                <div ref='toast' style = {{display:this.props.isShowToast ? 'block':'none'}} className='toast-container'>
                    <div className='text'>{this.props.toastText}</div>
                </div>
            )
        }  
    }
}