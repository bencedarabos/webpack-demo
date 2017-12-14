## webpack3 学习笔记
小白的现代化前端学习笔记

### webpack环境搭建与基础配置
#### webpack安装
```bash
# 初始化node工程
mkdir webpack-demo && cd webpack-demo
npm init -y
# 安装webpack，通常非全局安装，而是保存为开发依赖
npm install webpack --save-dev
# 安装webpakc-dev-server，一个自带热重载的开发服务器
npm install webpack-dev-server
```
#### webpack基础配置
装好webpack之后，可以直接使用`webpack input output`的方式使用，但是参数较多，所以通常放在单独的配置文件webpack.config.js中，webpack运行时也会检查当前目录是否存在webpack.config.js，存在则加载并使用。

一个基础的的webpack.config.js是这样的，这里创建了两个文件夹，src和dist分别用来存储源码和打包后的文件。

```javascript
var path = require('path') // 类似python中的os.path模块，封装了对路径的基本操作
module.exports = {
    // 入口文件路径
    entry: { 
        entry: path.resolve(__dirname, 'src/entry.js'),
    },

    // 输出文件路径，这里注意要分开写路径和文件名
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    //模块：例如解读CSS,图片如何转换，压缩(loader?)
    module:{},

    //插件，用于生产模版和各项功能
    plugins:[],
    
    // 本地热更新开发服务器配置
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true, 
        port:8080,
        inline:true // 开启热更新
    }
}
```

此时就可以使用`webpack`（非全局安装时为node_modules/.bin/webpack)打包项目，或者使用`webpack-dev-server`进行热更新本地服务器

此外也可以在package.json里设置指令的别名，绑定到npm run [scriptname]，方便统一使用
```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "dev":"webpack-dev-server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.7"
  }
}
```
然后就可以使用`npm run build`和`npm run dev`分别进行打包和开启本地服务器了


### webpack模块
通过使用不同的Loader，Webpack可以的脚本和工具，从而对不同的文件格式进行特定处理（例如 vue,css,less,sass等），以css为例

#### css-loader和style-loader
css-loader和style-loader 是用来打包css文件的loader，期中style-loader负责处理css文件中的诸如url()等外部信息的，css-loader负责将css文件转换为style标签进行打包。两者需要先使用npm进行安装
```bash
npm install style-loader --save-dev
npm install css-loader --save-dev
```
之后需要在webpack.config.js中进行配置
```javascript
   module:{
        rules: [
            {
              test: /\.css$/, //正则匹配文件，必须
              use: [ 'style-loader', 'css-loader' ], // 对应使用的loader，可以串联,必须
              include: [],// 手动添加的文件或目录，可选
              exclude: [],// 手动排除的文件或目录，可选
              query: [] // 给loader的额外设置，可选
            }
          ]
    },
```
之后我们再运行`npm run dev`就会发现css生效了，而且整个加载过程中没有加载css文件，所有的样式都打包在了bundle.js中
