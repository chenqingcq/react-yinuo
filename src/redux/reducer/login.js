import {SET_USERNAME,SET_PASSWORD} from '../actions/actions-type';
import initState from './state.js';
function reducer (state = initState,action){
    switch(action.type){
        case SET_USERNAME:{
            state.username  = action.username
            break;
        }
        case SET_PASSWORD :{
            state.userage = action.userpassword
        }
    }
    return state;
}
export default reducer;