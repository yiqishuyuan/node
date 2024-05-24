const { url } = require("inspector")

// 一些公共模块
const baseURL = 'https://www.baidu.com'
const funarray = arr => arr.reduce((start, end) => {
    return start += end
}, 0)
// 将公共模块打包
module.exports = {
     url:baseURL,
     funcon:funarray
}