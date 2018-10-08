/**
 * Created by apple on 18/10/4.
 */

const express = require('express');
const ReactSSR = require('react-dom/server');
// console.log(ReactSSR);

// console.log(process);


const fs = require('fs');
const path = require('path');
//将模板html 读取到服务器上
const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');

//将server.entry.js里面的代码通过服务器请求返回
const serverEntry = require('../dist/server.entry.js').default;
// console.log(serverEntry);

const app = express();

app.use('/public',express.static(path.join(__dirname,'../dist')));

app.get('*',function (req, res) {

    //将server.entry.js里面的东西exports default出来
 const appString = ReactSSR.renderToString(serverEntry);

    //将模板里面的div下的 <app></app>替换成appString 渲染出来 把拿到的内容插入到div下
    res.send(template.replace('<!-- app -->',appString));
})

app.listen(3003,function () {
    console.log('listening on 3003');
})