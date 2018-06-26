
import React from 'react';
import './goodsParams.less'
class GoodsParams extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            attrList:[]
        }
    }
    componentDidMount(){
        document.title = '商品参数'  ;
        this.setState({
            attrList:this.props.attrList
        })   
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
                        {   
                            this.props.attrList.length?
                            this.props.attrList.map((item,index)=>{
                                return (
                                    <li key= {index}>
                                        <span>{item.attrName}</span>
                                        <span>{item.attrValue}</span>
                                     </li>
                                )
                            }):
                            (
                                <li>
                                        <span></span>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default GoodsParams