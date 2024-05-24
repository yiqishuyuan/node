const {num} = require('./lib/sum.js')
const {url} = require('./lib/web.js')
// 导出后的模块再导出
module.exports = {
    num,
    url
}