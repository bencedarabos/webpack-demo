## webpack3 学习笔记
小白的现代化前端学习笔记 day2

### webpack插件配置
#### 使用HtmlWebpackPlugin发布html文件
HtmlWebpackPlugin可以帮你完成托管html文件，自动加入js引用，压缩html文件等等操作

移动index.html到src目录，并删除期中的script标签，开发环境的html文件要和生产环境的html分离
```js
//在webpack.config.js中引入
const htmlPlugin= require('html-webpack-plugin')
// 在plugins中进行初始化
    plugins: [
        new htmlPlugin({
            minify:{ // 对html文件进行压缩
                removeAttributeQuotes:true
            },
            hash:true, // 避免js文件缓存
            template:'./src/index.html' // 要打包的html模板文件位置，js标签会被自动加入并导出到设置的output文件夹中
        })
    ],
```
之后运行webpack，可以发现dist文件夹中新出现了index.html，这个就是发布后的html文件，期中bundle.js已经自动引入了