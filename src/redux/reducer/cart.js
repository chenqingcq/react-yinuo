import {INCREMENT,DECREMENT} from '../actions/actions-type';
import initState  from '../state';
function reducer(state = initState,action){
    switch (action.type){
        case INCREMENT :{
            state.count = state.count + action.count 
        }
        case DECREMENT :{
            state.count = state.count - action.count 
        }
    }
    return state;
}
export default reducer;