import axios from 'axios'
import store from '../store'
//创建axios实例
var service = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 50000
})
service.interceptors.request.use(config => {
  let token = store.state.userInfo.token
  console.log(store.state.userInfo)
  if (token) {
    //将token放到请求头发送给服务器,将tokenkey放在请求头中
    config.headers.Authorization = token
    return config
  }
})

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
