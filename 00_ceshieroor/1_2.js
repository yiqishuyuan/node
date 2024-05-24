// 模拟路径请求
const fs = require('fs')
const path = require('path')
const http = require('http')
const server = http.createServer()
// 返回文本
// server.on('request', (er, data) => {
//     //    请求响应
//     data.setHeader('Content-Type', 'text/plain;charset=utf-8')
//     //  返回
//     data.end('你好，欢迎使用node.js编写的api服务')
// })
// // 配置端口 3000
// server.listen(3000, () => {
//     console.log('confirm start api!')
// })


// 案列，将使用服务将04文件夹中的index.html返回到服务
server.on('request', (request, data) => {
    if (request.url === '/index.html') {
        fs.readFile(path.join(__dirname, './04/list/index.html'), (er, re) => {
            //   设置响应头
            if (er) console.log(er)
            else {
                data.setHeader('Content-Type', 'text/html;chatset=utf-8')
                data.end(re.toString())
            }

        })
    }
    else {
        data.setHeader('Content-Type', 'text/html;charset=utf-8')
        data.end('your path not found !')
    }

})
// 设置端口
server.listen(8080, () => {
    console.log('serverpath confirm!')
})