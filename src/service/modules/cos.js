/**
 * Created by hejiahui on 2018/5/5.
 */

import {
  get,
  post,
} from '@/services/ajax/netaxios'

class Cos {

  getTecentCos(){
    const url = '/api/task/tx/config'
    return get(url,{})
  }
  // 写死的 签名
  getStaticCos(){

    const url = '/api/task/config'
    return get(url,{})
  }

}

export default new Cos()
