import { checkcode, checkphone } from "../utils/check";
console.log(checkphone('12345678923'));
console.log(checkcode('234561'));






// webpack生成html


// css
// 引入外部的css,当然需要三方的html
// import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'
import './index.less';



// 导入图片压缩
import imgobj from './img/下载.png'
const theimg = document.createElement('img')
theimg.src = imgobj
document.querySelector('form .img-info').appendChild(theimg)



//导入请求体
import Myaxios from '../utils/request'


document.querySelector('form .btn').addEventListener('click', () => {
    const phone = document.querySelector('form .user-info').value
    const password = document.querySelector('form .password').value
    if (!checkphone(phone)) {
        console.log('error!phone length not to 11!')
        return
    }
    if (!checkcode(password)) {
        console.log('error!code length not to 6!')
        return
    }
    console.log('加载中')
    Myaxios({
        url: '/v1_0/authorizations',
        method: 'post',
        data: {
            mobile: phone,
            code: password,
        }
    }).then(re=>{
        alert('login on!')
        localStorage.setItem('token',re.data.data.token)
        location.href = '../content/index.html'
        console.log(re)
    }).catch(re=>{
        alert('error data!')
        console.log(re)
    })
})

// config webpack?devtool=inline-source-map
// consolee.log('错误测试')

// 测试别名,@表示绝对路径，查看webpack-config-js的resolve
import Myaxiosother from '@/utils/request.js'
console.log(Myaxiosother)