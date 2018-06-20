// /member/memberAddress/getDefaultimport AppService  from '../../../service';
// import baseUrl =
// 地址管理
import {Api} from '../../../utils/lib/lib';

import AppService  from '../../../service';

export function initAdressList(params) {  // 加载地址信息
    return AppService.get(`${Api.memberURL}/member/memberAddress/get`,params)
}
export function getAdressList(params) {  // 获取地址列表
    return AppService.get(`${Api.memberURL}/member/memberAddress/list`,params)
}
export function deleteAdress(params) {  // 删除地址列表
    return AppService.post(`${Api.memberURL}/member/memberAddress/delete`,params)
}
export function updateAdress(params) {  // 刷新地址列表
    return AppService.post(`${Api.memberURL}/member/memberAddress/update`,params)
}
// /member/memberAddress/update