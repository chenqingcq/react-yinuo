import cart from './cart';
import login from './login';
import {combineReducers} from 'redux';
let reducers  = combineReducers ({
    cart,
    login,
})
export default reducers;