import React from 'react';

import './comments.less'
class Comments extends React.Component {
    componentDidMount(){
        document.title = '商品评论'
    }
    render(){
        return (
            <div className ='goods-comments-container'>
                商品评论11
            </div>
        )
    }
}
export  default Comments;