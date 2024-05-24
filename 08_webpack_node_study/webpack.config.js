const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const HtmlWebpackPlugin = require('html-we')
// 指定webpack打包输入输出路径
// const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { type } = require('os');
const { generateKey } = require('crypto');
const webpack = require('webpack')
const config =  {
    // 自动打包，打包模式，生产禁用,更快使用package.json
    // mode:"development",
    // 指定入口
    entry:{
        'login': path.resolve(__dirname, 'src/login/index.js'),
        'content':path.resolve(__dirname,'src/content/content.js'),
        'publish':path.resolve(__dirname,'src/publish/publish.js'),
        'all':path.resolve(__dirname,'src/utils/all.js')
        
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name]/index.js',
        clean: true
    },
    // html-webpack-plugin
    plugins: [
        //    new htmlwebpackplugin //login
        new HtmlWebpackPlugin({
            // 模板
            template: path.resolve(__dirname, 'public/login.html'),
            // 输出
            filename: path.resolve(__dirname, 'dist/login/login.html'),
            // 
            useCdn:process.env.NODE_ENV ==='production',
            chunks:['login',]    //引入上面哪些模块，下面如同
        }),
        //content
        new HtmlWebpackPlugin({
            // 模板
            template: path.resolve(__dirname, 'public/content.html'),
            // 输出
            filename: path.resolve(__dirname, 'dist/content/index.html'),
            // 
            useCdn:process.env.NODE_ENV ==='production',
            chunks:['content','all']
        }),
        // publish
        new HtmlWebpackPlugin({
            // 模板
            template: path.resolve(__dirname, 'public/publish.html'),
            // 输出
            filename: path.resolve(__dirname, 'dist/publish/index.html'),
            // 
            useCdn:process.env.NODE_ENV ==='production',
            chunks:['publish','all']
        }),
        // css file
        
        new MiniCssExtractPlugin({
            filename:'./[name]/index.css'
        })
            
    ],
    // style-loader,css-loader ===》如果单独独立出css文件请不要使用style-loader,请使用mini-css-extract-plugin替换
    // 加载更多模块
    module: {
        rules: [
            {
                test: /\.css$/i,
                // use: ["style-loader", "css-loader"],
                use: [process.env.NODE_ENV === 'development' ? 'style-loader':MiniCssExtractPlugin.loader, "css-loader"],
            },
            // less规则
            {
                test: /\.less$/i,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader':MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',

                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/[hash][ext][query]'   //hash编译名，ext图片名占位，query为?请求查询参数占位
                }
            }
        ],
    },
    
    optimization: {
        // 最小
        minimizer: [
            // 保留js压缩
            '...',
            // 优化css
            new CssMinimizerPlugin(),
        ],
        // 公共代码分割
        splitChunks:{
            chunks:'all',   //所有数据模块分析
            cacheGroups:{   //分割组-缓冲组
                commons:{   //公共模块
                    minSize:0,   //最小字段
                    minChunks:2,  //最小数据模块
                    reuseExistingChunk:true,     //重复的数据块的输出
                    name(module,chunks,cacheGroupsKey){    //分离模块文件名
                        const allChunksNames = chunks.map((item)=>item.name).join('~')   //模块名
                        return `./js/${allChunksNames}`  //输出到dist目录
                    }


                }

            }

        }
    },

    // 解析别名
    resolve:{
        alias:{
            '@':path.resolve(__dirname,'src')
        }
    }



}
// 开发错误定位，生产禁用
if(process.env.NODE_ENV==='development'){
    config.devtool = 'inline-source-map'
}

// const phone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
if(process.env.NODE_ENV === 'production'){
    config.externals = {
        // 生产模式忽略本地引入的包
        // 列入：axios包
        "axios":'axios'
    }
}
module.exports = config