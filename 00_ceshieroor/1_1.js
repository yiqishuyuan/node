//fs读写文件
const fs = require('fs')
// 写入文件
fs.writeFile('./text.txt','hello world,this is my first file',(err)=>{
    console.log(err)
})
// 读取文件
fs.readFile('./text.txt',(err,data)=>{
    if(err) console.log(err)
    else console.log(data,data.toString())
// 读取为buffer 十六进制 .tostring()
})