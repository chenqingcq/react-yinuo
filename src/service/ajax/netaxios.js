/**
 * Created by Administrator on 2017/8/10.
 */

import axios from 'axios'
// import Qs from 'qs'
import queryString from 'query-string';
 
import { Toast } from 'antd-mobile';
var instance = axios.create({
  timeout : 15000,
  withCredentials: true,
  // channel:'iOS' ,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // channel:'iOS'
    // 'API_VER':'V1.0.0',
  },
  transformRequest: function (data) {
    // 对 data 进行任意转换处理
    let ret = '';
    if (data) {
      ret = queryString.stringify(data)
      return ret;
    }
  },
});
// 全局登录拦截拦截
// var duration, onClose, mask, response;

instance.interceptors.request.use(config => {
  // element ui Loading方法
  Toast.loading('请求中...',10)
  return config
}, error => {
  Toast.hide()
  Toast.fail('加载超时...',2)
  return Promise.reject(error)
})
// http响应拦截器
instance.interceptors.response.use(response => {// 响应成功关闭loading
  Toast.hide()
  return response
}, error => {
  Toast.hide()  
  Toast.fail('出了点小意外...',2)  
  return Promise.reject(error)
})

function getToken(){
  if(window.localStorage.getItem('token')){
    return (window.localStorage.getItem('token').replace("\"","").replace("\"",""));        
  }else{
    return ''
  }
}
const AppService = {
  get: (url, data,configs) => {
    return instance.get(url, data ? 　{
      params: data,
    } : {},{
      headers:{
        'token': getToken()
     }
    })
  },
  post: (url, data,configs) => {
    // if(data) {
    //   url = url + '?' + queryString.stringify(data)
    // }
    // data = data ?  queryString.stringify(data) : null
    return instance.post(url, data,{
      headers:{
        'token': getToken()
     }
    })
  },
  put: (url, data) => {
    if (data) {
      url = url + '?' + queryString.stringify(data)
    }
    // data = data ? queryString.stringify(data) : null
    return instance.put(url)
  },
  delete: (url, data) => {
    return instance.delete(url, data ? {
      params: data
    } : {})
  },
  patch: (url, data) => {
    if (data) {
      url = url + '?' + queryString.stringify(data)
    }
    return instance.patch(url, data)
  }
}

export default AppService