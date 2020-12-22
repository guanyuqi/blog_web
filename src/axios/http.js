import axios from 'axios'
import store from '../store'
//创建axios实例
var service = axios.create({
  /* baseURL: 'http://localhost:8000', */
  baseURL: 'https://api.kanyaky.com:8000',
  /* baseURL: 'https://www.kanyaky.com/api/', */
  timeout: 50000
})

/* 请求拦截器 */
service.interceptors.request.use(
  config => {
    if (!store.state.userInfo) {
      return config
    }
    let { token } = store.state.userInfo
    if (token.length) {
      config.headers = { Authorization: 'Bearer ' + token }
      return config
    }
  },
  err => {
    //请求出错的处理函数
    return Promise.reject(err)
  }
)

/* 响应拦截器 */
service.interceptors.response.use(
  response => {
    //拦截响应，做统一处理
    if (response.data.code) {
      switch (response.data.code) {
        case 401:
          localStorage.setItem('userInfo', null)
          store.dispatch('setUserInfo', null)
          store.dispatch('loginDialog', true)
          console.log('成功清空')
      }
    }
    return response
  },
  error => {
    console.log('进入响应拦截器')
    return Promise.reject(error)
  }
)

export default {
  //get请求，其他类型请求复制粘贴，修改method
  get(url, param, headers) {
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url,
        params: param,
        headers: headers
      })
        .then(res => {
          //axios返回的是一个promise对象
          var res_code = res.status.toString()
          if (res_code.charAt(0) == 2) {
            cback(res) //cback在promise执行器内部
          } else {
            console.log(res, '异常1')
          }
        })
        .catch(err => {
          if (!err.response) {
            reject(err.response)
            console.log('请求错误')
          } else {
            reject(err.response)
            console.log(err.response, '异常2')
          }
        })
    })
  },

  post(url, data, headers) {
    return new Promise((cback, reject) => {
      service({
        method: 'post',
        url,
        data: data,
        headers: headers
      })
        .then(res => {
          //axios返回的是一个promise对象
          var res_code = res.status.toString()
          if (res_code.charAt(0) == 2) {
            cback(res) //cback在promise执行器内部
          } else {
            console.log(res, '异常1')
          }
        })
        .catch(err => {
          if (!err.response) {
            reject(err.response)
          } else {
            reject(err.response)
            console.log(err.response, '异常2')
          }
        })
    })
  }
}
