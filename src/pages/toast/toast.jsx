import React from 'react';
import './toast.less'
export default class Toast extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShowModal :true,
            proText:''
        }
    }
    closeModal(){
        this.props.closeModal();
    }
    componentDidMount(){
        if(this.props.isProc){
            this.setState({
                ...this.state,
                proText:this.props.toastText.context
            })
            // this.refs.proContainer.innerHTML =  this.props.toastText.context
            setTimeout(()=>{
                console.log(this.state.proText)
            })
        }
    }
    render(){
        if(this.props.isProc ){
            return (
                <div onClick = {this.closeModal.bind(this)} ref='modal' style = {{display:this.props.isShowToast ? 'block':'none'}} className='modal-container'>
                     <div className = 'modal' ref = 'proContainer'>
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