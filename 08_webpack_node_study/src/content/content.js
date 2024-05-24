// 引入
import '@/utils/auth.js'
import axios from '@/utils/request.js'
import './content.css'
import '@/utils/all.js'


// 设置登录
// document.querySelector('.box-left .info-content li').addEventListener('click',(e)=>{
//     e.preventDefault()
//     console.log(e.target.id)
//     if (e.target.id === '0'){
//         location.href = '../publish/index.html'
//     }
// })
// const ulall = document.querySelectorAll('.box-left ul li')

// const { url } = require("inspector")

// console.log(ulall)
document.querySelector('.box-left ul').addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(e.target.id)
    if (e.target.id === '0') {
        location.href = '../publish/index.html'
    }
})
// 内容展示
// 准备查询对象
const request_obj = {
    status: '',    //文章状态 1待审核，2审核通过,空字符串
    channel_id: '',   //文章频道id，空字符串为全部
    page: 1, //当前页码
    per_page: 2,    //当前页码的总共审核数量
}
// 点击按钮总页数，初始值为0页
let total_count = 0;
// 创建一个函数，用来复用
async function getdata() {
    //    请求
    const re = await axios({
        url: '/v1_0/mp/articles',
        params: request_obj
    })
    console.log(re)
    const re_str = re.data.data.results.map(item => {
        // console.log(item)

        return `   <tr>
        <td>${item.cover.type === 0 ? `<img src="../img/4c048b5388f5467ca2d623e552788059_tplv-dy-aweme-images_q75.webp" alt=""
        srcset="">`: `<img src="${item.cover.images[0]}" alt=""
        srcset="">`}</td>
        <td>${item.title}</td>
        <td>${item.status == 1 ? `待审核` : `审核通过`}</td>
        <td>${item.pubdate}</td>
        <td>${item.read_count}</td>
        <td>${item.comment_count}</td>
        <td>${item.like_count}</td>
        <td data-id="${item.id}">
        <a href="javascript:;" class="del">删除</a>
        <a href="javascript:;" class="edit">编辑</a>
        </td>

    </tr>`
    }).join('')
    document.querySelector('.box-right .main-page tbody').innerHTML = re_str

    total_count = re.data.data.total_count
    document.querySelector('.box-right .main-page .footer .pageall').innerText = `共${total_count}页`
}
getdata()

// 筛选
// 获取频道列表
async function getselect() {
    const re = await axios({
        url: '/v1_0/channels'
    })
    // console.log(re)
    const re_str = re.data.data.channels.map(item => {
        // console.log(item)
        return `<option value="${item.id}">${item.name}</option>`
    }).join('')
    //  console.log(re_str)
    document.querySelector('.box-right .content-line .page-where select').innerHTML = `<option value="">请选择频道</option>` + re_str
}
getselect()
// 获取选择框中的值
document.querySelectorAll('.box-right .content-line .check-box input').forEach(radio_num => {
    radio_num.addEventListener('change', e => {
        console.log(e.target.id)
        // 返回值
        request_obj.status = e.target.id
    })
})
// 筛选频道值
// document.querySelector('.box-right .cotent-line .page-where select').addEventListener('change', (e)=>{
//     console.log(e.target.value)
// })
const channel_id = document.querySelector('.box-right .content-line .page-where select')
channel_id.addEventListener('change', (e) => {
    // console.log(e.target.value)
    const num = e.target.value
    request_obj.channel_id = num

})
// 点击筛选后执行
document.querySelector('.box-right .content-line .btn').addEventListener('click', () => {
    // 调用请求函数
    getdata()
})
// 点击翻页等状态
document.querySelector('.box-right .main-page .footer .right').addEventListener('click', e => {
    // 判断临界值，向上取整
    // console.log(1)
    if (request_obj.page < Math.ceil(total_count / request_obj.per_page)) {
        request_obj.page++
        document.querySelector('.box-right .main-page .footer .onlinepage').innerText = `第${request_obj.page}页`
        //  调用函数执行
        getdata()
    }
})
document.querySelector('.box-right .main-page .footer .left').addEventListener('click', e => {
    // 判断临界值，向上取整
    if (request_obj.page > 1) {
        request_obj.page--
        document.querySelector('.box-right .main-page .footer .onlinepage').innerText = `第${request_obj.page}页`
        //  调用函数执行
        getdata()
    }
})


// 删除
document.querySelector('.box-right tbody').addEventListener('click', async e => {
    // console.log(e.target.className === 'del')
    // 判断
    if (e.target.classList.contains('del')) {      //或者使用e.target.className === 'del'
        const delid = e.target.parentNode.dataset.id
        if (confirm('确定删除？')) {
            // 调用接口
            const re = await axios({
                url: `/v1_0/mp/articles/${delid}`,
                method: 'DELETE'
            })
            //判断页码
            const children = document.querySelector('.box-right tbody').children
            if (children.length === 1 && request_obj.page !==1) {
                request_obj.page--
                document.querySelector('.box-right .main-page .footer .onlinepage').innerText = `第${request_obj.page}页`
            }



            // 调用函数刷新页面

            getdata()
        }

    }

})
// 修改
document.querySelector('.box-right tbody').addEventListener('click',e=>{
    if (e.target.classList.contains('edit')) {
        const editid = e.target.parentNode.dataset.id
        location.href = `../publish/index.html?id=${editid}`
    }
})
