import * as types from './actions-type';
let cart = {
    add(n) {
        return {
            type: types.INCREMENT,
            count: n
        }
    }
    minus(n) {
        return {
            type: types.DECREMENT,
            count: n
        }
    }
}