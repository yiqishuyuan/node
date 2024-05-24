import axios from '@/utils/request.js'
import './pulish.css';
import '@/utils/auth.js';
import '@/utils/all.js'



// 跳转

document.querySelector('.box-left ul').addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(e.target.id)
    // console.log(e.target.localName)

    if (e.target.id === '1') {
        location.href = '../content/index.html'

    }

})
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
// 获取封面


const input_file = document.querySelector('.box-right .content-line .img-title .fileinput')
const img_title = document.querySelector('.box-right .content-line .img-title')
// 使用click()来打开input的file
img_title.addEventListener('click', () => {
    input_file.click()
})

input_file.addEventListener('change', async (e) => {
    console.log(e.target.files)
    // 准备上传
    // 内置函数
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('image', file)
    // console.log(fd)
    const re_ig = await axios({
        url: '/v1_0/upload',
        method: 'post',
        data: fd,
    }).then(re => {
        console.log(re)
        alert(re.data.message)
        img_title.style.backgroundImage = `url(${re.data.data.url})`
        // console.log(img_title.style.backgroundImage)
        img_title.style.backgroundSize = `cover`
    }).catch(re => {
        alert(re.response.data.message)
    })
    // console.log(re_ig)


})
// 收集option id
let globalnum;
const channel_id = document.querySelector('.box-right .content-line .page-where select')
channel_id.addEventListener('change', (e) => {
    // console.log(e.target.value)
    const num = e.target.value
    globalnum = num

})
// console.log(globalnum)
// 提交整体数据
const title = document.querySelector('.box-right .content-line .check-box .title')
const btn = document.querySelector('.box-right .content-line .button')

const areatext = document.querySelector('.box-right .content-line .content-write .message')
btn.addEventListener('click', async (e) => {
    if (e.target.value !== '提交') return


    const backgroundImage = document.querySelector('.box-right .content-line .img-title').style.backgroundImage
    // console.log(backgroundImage.slice(4, -1).replace(/"/g, ""));
    let setall = {}
    // console.log(channel_id)
    setall.channel_id = globalnum
    setall.content = areatext.value
    setall.title = title.value
    setall.cover = {
        type: 1,
        image: [backgroundImage.slice(4, -1).replace(/"/g, "")]
    }
    // console.log(setall)
    // 请求
    try {
        const res = await axios({
            url: 'v1_0/mp/articles',
            method: 'post',
            data: setall
        })
        alert(res.data.message)
        location.href = '../content/index.html'
    } catch (error) {
        alert('未填写完成')
    }
})


    //数据回显修改
    // 使用一下区域函数
    ; (() => {
        // 获取返回修改时携带的id参数
        const edit = location.search
        // console.log(edit)
        // 传入URL
        const newedit = new URLSearchParams(edit)
        // console.log(newedit)
        // 分割
        newedit.forEach(async (value, id) => {
            // console.log(value, id)
            if (id === 'id') {
                // 覆盖文档
                document.querySelector('.box-right .content-line span').innerHTML = '编辑文档'
                document.querySelector('.box-right .content-line .button').value = '修改'
                const re = await axios({
                    url: `/v1_0/mp/articles/${value}`
                })
                // console.log(re)
                const data_obj = {
                    title: re.data.data.title,
                    channel_id: re.data.data.channel_id,
                    content: re.data.data.content,
                    image: re.data.data.cover.images[0],
                    id: re.data.data.id
                }
                // console.log(data_obj)
                // 遍历回显
                Object.keys(data_obj).forEach(key => {
                    // console.log(data_obj.keys)
                    // console.log(key)
                    if (key === 'image') {
                        img_title.style.backgroundImage = `url(${data_obj[key]})`
                    }
                    else if (key === 'content') {
                        areatext.value = data_obj[key]
                    }
                    else if (key === 'title') {
                        title.value = data_obj[key]
                    }
                    else if (key === 'channel_id') {
                        channel_id.value = data_obj[key]
                    }


                })
            }
        })
    })()

// 更新编辑
btn.addEventListener('click', async (e) => {
    console.log(e.target.value)
    if (e.target.value !== '修改') return alert('值错误，请返回')


    const backgroundImage = document.querySelector('.box-right .content-line .img-title').style.backgroundImage
    // console.log(backgroundImage.slice(4, -1).replace(/"/g, ""));
    let setall = {}
    // console.log(channel_id)
    setall.channel_id = globalnum
    setall.content = areatext.value
    setall.title = title.value
    setall.cover = {
        type: 1,
        image: [backgroundImage.slice(4, -1).replace(/"/g, "")]
    }
    // console.log(setall)
    // 请求
    const re_id = location.search;
    const re_edit = re_id.slice(4)
    try {
        const res = await axios({
            url: `v1_0/mp/articles/${re_edit}`,
            method: 'put',
            data: setall
        })
        alert(res.data.message)
        location.href = '../content/index.html'
    } catch (error) {
        alert('未填写完成')
    }
})
