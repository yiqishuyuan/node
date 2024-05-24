// 将pubilsh中的index压缩并写入到list中的index.html中
const fs = require('fs')
const path = require('path')
fs.readFile(path.join(__dirname, './index.html'), (er, data) => {
    if (er) console.log(er)
    else {
    const str_data = data.toString()
    // 去掉反斜杠n和r
    const re = str_data.replace(/[\r\n]/g,'')
    // 写入文件,list下没有任何文件则自动创建
    fs.writeFile(path.join(__dirname,'../list/index.html'),re,er=>{
        if(er) console.log(er)
        else console.log('写入成功')
    })
}
})