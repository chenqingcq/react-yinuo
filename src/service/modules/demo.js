/**
 * Created by hejiahui on 2018/4/13.
 */

import AppService from '../ajax/netaxios'


class Demo {
  /**
   * 用于本地的登陆
   * */
  devUserLogin(opt, isShowFullLoading = true) {
    const url = '/logout'
    const params = opt || {}
    return AppService.post(
      url, params, isShowFullLoading
    )
  }
}

export default new Demo()
