import React, { Component } from 'react';
import './button.less'
export default class Button extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    handlerClick() {
        this.props.handlerClick()
    }
    render() {
        return (
            <div style={{ ...this.props.styleSheet}} ref='btn' className='button' onClick={this.handlerClick.bind(this)} >{this.props.text}</div>
        )
    }
}