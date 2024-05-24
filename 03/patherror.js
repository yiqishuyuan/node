const { ifError } = require('assert')
const fs = require('fs')
const path = require('path')
// 在03文件中读取外部文件时直接读取文件会报错，需要使用path.join()和__dirname来配合读取本地文件
// fs.readFile('../text.txt',(err,data)=>{
//     if(err) console.log(err)
//     else console.log(data,data.toString())
// // 读取为buffer 十六进制 .tostring()
// })

console.log(__dirname)     //C:\Users\lily\Desktop\node\03,打印当前文件路径
// 更改如下
fs.readFile(path.join(__dirname,'../text.txt'),(err,data)=>{
    if(err) console.log(err)
    else console.log(data.toString())
})