/*
*微信相关
*/
import {
  wxBaseData,
  wxCode,
  wxJssdk
} from "./apipath"
import {post, get} from '@/services/ajax/netaxios'


class Wechat {
  getWxBaseData(url) {
    return get(wxBaseData, {
      url
    })
  }
  getWxCode(p) {
    return get(wxCode, p)
  }

  getWxJssdk(url) {
    return new Promise(((resolve, reject) => {
      get(wxJssdk, {url}).then((data) => {
        resolve({
          "url": "",
          "jssdk": data
        })
      }).catch((err) => {
        reject(err)
      })
    }))
  }

  configSign(){
    return get('/api/wx/jssdk',{
      currentUrl : location.origin + location.pathname
    })
  }

  wechatShare(opt){
    const url = '/api/wx/share/wx'
    const params = opt || {}
    return post(url, params)
  }
}
export  default new Wechat()
/*
//========================获取微信配置 start==========================================
export function getWxBaseData(url) {
  return get(wxBaseData, {
    url
  })
}
//========================获取微信配置 end==========================================

//========================获取微信配置 start==========================================
export function getWxCode(p) {
  return get(wxCode, p)
}
//========================获取微信配置 end==========================================

//========================获取微信配置 start==========================================
export function getWxJssdk(url) {
  return new Promise(((resolve, reject) => {
    get(wxJssdk, {url}).then((data) => {
      resolve({
        "url": "",
        "jssdk": data
      })
    }).catch((err) => {
      reject(err)
    })
  }))
}*/
//========================获取微信配置 end==========================================

