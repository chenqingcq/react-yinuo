import React from 'react';

import './addNewAddress.less'
class AddNewAddress extends React.Component{
    componentDidMount(){

    }
    link_to_add_address(){
        this.props.history.push('/member/createAddress')
    }
    render(){
        return (
            <div className='addNewAddress-container'>
                <div className='hint' onClick={this.link_to_add_address.bind(this)}>
                    {/* <img src={require('../../../assets/img/add.png')} alt=""/>                     */}
                    +
                </div>
                <p>你还没有地址,请先添加地址</p>
            </div>
        )
    }
}
export default AddNewAddress