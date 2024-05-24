//使用npm init -y 初始化
// 使用npm i 包名 下载包
// 导包dayjs
const dayjs = require('./node_modules/dayjs')
console.log(dayjs)
// 构造函数调用
const newdatestr = dayjs().format('YYYY-MM-DD')
console.log(newdatestr)