
import React from 'react';
import './goodsParams.less'
class GoodsParams extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        document.title = '商品参数'     
    }
    onClose(e){
       this.props.closeGoodsParams(e)
    }
    render(){
        return (
            <div className = 'goodsParams-container' style ={{display:this.props.visible?'block':'none'}}>
                <div className ={ this.props.visible? 'showGoodsParams-active':'showGoodsParams-fade'}>
                    <div>
                        <span>产品参数</span>
                        <img alt='' onClick= {this.onClose.bind(this)}  src = {require('../../../assets/img/close@2x.png')}/>
                    </div>
                    <ul>
                        <li>
                            <span>年份季节</span>
                            <span>2018夏季</span>
                        </li>
                        <li>
                            <span>年份季节</span>
                            <span>2018夏季</span>
                        </li>
                        <li>
                            <span>年份季节</span>
                            <span>2018夏季</span>
                        </li>
                        <li>
                            <span>年份季节</span>
                            <span>2018夏季</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default GoodsParams