import * as types from './actions-type';
let login = {
    setUsername(name) {
        return {
            type: types.SET_USERNAME,
            name: name
        }
    },
    setUserage(age) {
        return {
            type: types.SET_USERAGE,
            age: age
        }
    }
}
export default login;