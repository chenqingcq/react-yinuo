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
    // 'TOKEN':`eyJhbGciOiJIUzI1NiIsInR5cCI6Ik
    // pXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VySWQiOiI5OTQ4MzU1MDY0NzI3MTQyNDIiLCJjaGF0SWQiOiIxMDAyOTQ4MiJ9LCJpYXQiOjE1MjYyODEyNDYsImV4cCI6MTUzMTQ2NTI0Nn0.Ni3JNj9H67bKhaxim0qwlqfsTgv-ka1nCobj2EcGFWs`
  },
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    let ret = '';
    if (data) {
      ret = queryString.stringify(data)
      return ret;
    }
  }],
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
  Toast.fail('加载失败...',2)  
  return Promise.reject(error)
})


const AppService = {
  get: (url, data) => {
    return instance.get(url, data ? 　{
      params: data,
    } : {})
  },
  post: (url, data) => {
    // if(data) {
    //   url = url + '?' + queryString.stringify(data)
    // }
    // data = data ?  queryString.stringify(data) : null
    return instance.post(url, data,{
      headers:{
        // channel:'iOS'
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