// 使用ecmascript语法来进行导入和导出

import exp from "constants"

// 一些公共模块
const baseURL = 'https://www.baidu.com'
const funarray = arr => arr.reduce((start, end) => {
    return start += end
}, 0)
// 导出
export default {
    url: baseURL,
    arrcon: funarray,
}


// 假设我们有一些单独的模块需要导出，则可以直接在导出的模块前面加export
export const URLtwo = 'http://www.yiqishuyuan.net'  // 该网站为我的自主网站
export const funtionarr = arr => arr.reduce((start, end) => {
    return start += end
}, 0)