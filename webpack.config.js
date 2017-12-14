var path = require('path')
module.exports = {
    entry: {
        entry: path.resolve(__dirname, 'src/entry.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:8080
    }
}