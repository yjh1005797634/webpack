/**
 * Created by apple on 18/10/3.
 */


const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

console.log(webpack.HotModuleReplacementPlugin);

//判断是否是开发环境 启动命令的时候 告诉是不是开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = {

    entry:{
        app:path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
        path:path.join(__dirname,'../dist'),
        // publicPath:'../dist/',
        publicPath:'/public/'
    },

    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test:/\.(png|svg|jpg|gif)$/,
                use:{
                    loader:'file-loader'
                }

            },

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
    },

    plugins:[
        new HTMLPlugin({
            template:path.join(__dirname,'../client/template.html')
        }),
        // new webpack.HotModuleReplacementPlugin()
        // new webpack.HotModuleReplacementPlugin()
    ]

}

if(isDev){

    config.entry = {
        app:[
            'react-hot-loader/patch', //官方提供的做法
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer = {
        host:'0.0.0.0', //表示可以127  可以localhost 可以是局域网IP
        port:'8888',
        contentBase:path.join(__dirname,'../dist'),
        hot:true,
        // inline:true,
        overlay:{   //表示如果出现错误 会在浏览器弹出灰色提示框
            errors:true
        },
        //这里不设置 是不能请求到正确的app png的
        publicPath:'/public/',
        historyApiFallback:{
            index:'/public/index.html'
        }
    }

     config.plugins.push(new webpack.HotModuleReplacementPlugin()); //添加一个hot插件

}

module.exports = config;