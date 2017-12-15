## webpack3 学习笔记
小白的现代化前端学习笔记 day1

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
装好webpack之后，可以直接使用`webpack input output`的方式使用，但是参数较多，所以通常放在单独的配置文件webpack.config.js中，webpack运行时也会检查当前目录是否存在webpack.config.js，存在则加载并使用。

一个基础的的webpack.config.js如下，这里创建了两个文件夹，src和dist分别用来存储源码和打包后的文件。

```javascript
var path = require('path') // 类似python中的os.path模块，封装了对路径的基本操作
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

此时就可以使用`webpack`(非全局安装时间使用./node_module/.bin/webpack)打包项目，或者使用`webpack-dev-server`开启本地热更新服务器

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
然后就可以使用`npm run build`和`npm run dev`分别进行打包和开启本地服务器


### webpack模块
通过使用不同的Loader，Webpack可以的脚本和工具，从而对不同的文件格式进行特定处理(例如 vue,css,less,sass等),以css为例

#### css-loader和style-loader
css-loader和style-loader 是用来打包css文件的loader，期中style-loader负责处理css文件中的诸如url()等外部信息的，css-loader负责将css文件转换为style标签并打包。两者需要先使用npm进行安装
```bash
npm install style-loader --save-dev
npm install css-loader --save-dev
```
之后需要在webpack.config.js中进行配置
```javascript
   module:{
        rules: [ //当然 这里的格式可以有很多种，不仅仅局限于这一种，wepack的配置文件非常灵活
            {
              test: /\.css$/, //正则匹配文件，必须
              use: [ 'style-loader', 'css-loader' ], // 对应使用的loader，可以串联,必须
              include: [],// 手动添加的文件或目录，可选
              exclude: [],// 手动排除的文件或目录，可选
              query: [] // 给loader的额外设置，可选
            }
          ]
    },
```
之后我们再运行`npm run dev`就会发现css生效了，而且整个加载过程中没有加载css文件，所有的样式都打包在了bundle.js中

### webpack插件配置
#### 配置uglifyjs插件（已经集成，不需要额外安装）
首先在webpack.config.json当中引入这个插件
```js
cosnt uglify = require('uglifyjs-webpack-plugin')
```
然后在plugins中启用这一项。
```js
    plugins: [
        new uglify()
        ],
```
之后再执行npm run build，可以看到dist文件夹下面的bundle.js已经是被混淆过的代码了。混淆通常用于生产环境，所以开发环境中一般不会启用，所以npm run dev会报错。
找到原因了，是vscode在中文输入法下的bug，参见这个issue[#37114](https://github.com/Microsoft/vscode/issues/37114)，暂时没得解决，只好先用其他编辑器了。或者忍住不敲退格？
