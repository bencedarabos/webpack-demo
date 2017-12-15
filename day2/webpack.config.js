var path = require('path')
const htmlPlugin= require('html-webpack-plugin')
module.exports = {
    entry: {
        entry: path.resolve(__dirname, 'src/entry.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, //正则匹配文件，必须
                use: ['style-loader', 'css-loader'], // 对应使用的loader，可以串联,必须
                //   include: [],// 手动添加的文件或目录，可选
                exclude: [],// 手动排除的文件或目录，可选
                // query: object // 给loader的额外设置，可选
            }
        ] 
    },
    plugins: [
        new htmlPlugin({
            minify:{ // 对html文件进行压缩
                removeAttributeQuotes:true
            },
            hash:true, // 避免js文件缓存
            template:'./src/index.html' // 要打包的html模板文件位置
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        compress: true,
        port: 8080,
        inline: true
    }
}