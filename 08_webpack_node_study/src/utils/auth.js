import axios from '@/utils/request.js'

const token = localStorage.getItem('token')
if(!token){
    location.href = '../login/index.html'
} 
//注意：该js不能引用到登录页，否则会不断跳转

// 在request中设置好了拦截请求器后，发起请求
axios({
    url:'/v1_0/user/profile'
}).then(re=>{
    // console.log(re)
    document.querySelector('.box-right .login .index-login').innerHTML = `<a href="javascript:;" class="last-a">欢迎你，管理员：${re.data.data.mobile}</a>`
})