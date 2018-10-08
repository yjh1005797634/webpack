/**
 * Created by apple on 18/10/4.
 */



const path = require('path');


module.exports = {

    // 表示是在js打包出来的内容是使用在哪个环境中 (这里是node环境中)
    target:'node',
    entry:{
        app:path.join(__dirname,'../client/server.entry.js')
    },
    output:{
        filename:'server.entry.js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/public/',
        libraryTarget:'commonjs2' //cmd amd commonJS
    },

    module:{
        rules:[

            {
                test:/\.jsx$/,
                //babel-loader 默认支持jsx编译 只是webpack的插件 但不是核心还
                //需要babel-core 才能识别
                use:{
                    loader:'babel-loader'
                }
            },

            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]

            }
        ]
    }

}