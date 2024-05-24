// 指定webpack打包输入输出路径
const path = require('path')


module.exports ={
    // 指定入口
    entry:path.resolve(__dirname,'src/index.js'),
    // 出口
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'./login/index.js',
        clean:true
    }
}