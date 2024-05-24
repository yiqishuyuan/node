import axios from 'axios'



// 公共请求数据位置
axios.defaults.baseURL = 'http://geek.itheima.net'

// 请求拦截器
axios.interceptors.request.use(function (where) {
    // 获取本地token
    const token = localStorage.getItem('token')
    // 判断
    token && (where.headers.Authorization = `Bearer ${token}`)
    return where
},re=>{
    return Promise.reject(re)
})
  

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 如果响应无误，则返回
    return response 
},re=>{
    // 响应错误则打印报错
    // console.dir(re.request.status)
    // if (re.request.status>=400 && re.request.status <500){
    //   alert('身份信息未通过，请重新登录')
    //   localStorage.clear()
    //   location.href = '../login/index.html'
    // }
    return Promise.reject(re)
})
// 导出
export default axios