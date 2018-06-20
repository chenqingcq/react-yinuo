import { state } from './state.js';
import { reducers } from './reducer';
import { createStore } from './createStore';
const{ dispatch, subscribe } = createStore(state, reducers);
export default {
    state,
    dispatch,
    subscribe
}
