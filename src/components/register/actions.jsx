import AppService  from '../../service';
// import baseUrl =
//用户注册

import {Api} from '../../utils/lib/lib';

export function getCheckCode(params) {  // 获取验证码
    return AppService.post(`${Api.memberURL}/base/sms/sendCode`,params)
}
export function verifyRegisterParam(params) {  // 校验注册参数
    return AppService.post(`${Api.memberURL }/member/register/verifyRegisterParam`,params);
}
export function registerProtocol() {  // 用户注册协议
    return AppService.get(`${Api.memberURL }/member/register/registerProtocol`)
}
