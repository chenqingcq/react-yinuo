import AppService  from '../../../service';
// import baseUrl =
//用户注册
// const  uer_register =  "https://member-pre.yinuoshangcheng.com"

// export function getCheckCode(params) {  // 获取验证码
//     return AppService.post(`${uer_register }/base/sms/sendCode`,params)
// }
// export function verifyRegisterParam(params) {  // 校验注册参数
//     return AppService.post(`${uer_register }/member/register/verifyRegisterParam`,params);
// }
// export function registerProtocol() {  // 用户注册协议
//     return AppService.get(`${uer_register }/member/register/registerProtocol`)
// }
// export function register(params) {  // 用户注册
//     return AppService.post(`${uer_register }/member/register/register`,params)
// }
import {Api} from '../../../utils/lib/lib.js';

export function getCheckCode(params) {  // 获取验证码
    return AppService.post(`${Api.memberURL}/base/sms/sendCode`,params)
}
export function verifyRegisterParam(params) {  // 校验注册参数
    return AppService.post(`${Api.memberURL }/member/register/verifyRegisterParam`,params);
}
export function registerProtocol() {  // 用户注册协议
    return AppService.get(`${Api.memberURL }/member/register/registerProtocol`)
}
export function register(params) {  // 用户注册
    return AppService.post(`${Api.memberURL }/member/register/register`,params)
}
