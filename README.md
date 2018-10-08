
### git推送

1)git init
2)touch .gitignore 在里面编辑 .DS_Store 和 node_modules 忽略这两个
3)git add .  添加所有文件夹及文件到暂缓区
4)git commit -m '提交到master'
5)git add remote origin https://github.com/yjh1005797634/webpack.git
6)git push -u master 即可


## webpack3 详细前后端配置及采坑
一、publicPath和public区别
    1.public是output项目打包后在本地的输出地址
    2.publicPath 是可有可无的 但引入image图片时  必须用到 因为图片的加载是要生成新的
      hash对象的 而css代码是在js中生成标签 再插入到HTML中 本质还是由js打包
    3.publicPath的路径是与输出的index.html有关的 是服务器的静态文件的根目录

二、编译jsx文件
   1.test jsx后缀
   2.安装 babel-loader(webpack插件) 但还需要babel-core核心代码来解析jsx
   3.编译babel-loader是默认加载 es6的 需要转为es2015 所以还需要安装babel-preset
     -es2015 babel-preset-es2015-loose  babel-preset-react

三、解析js和jsx语法的配置
    1.只解析jsx不能编译 还需要解析js
    2.同时解析js时  要exclude:../node_modules

四、服务器渲染基础配置
   1.为什么会有服务端渲染
     1)单页面存在的问题 SEO不友好
     2)首次请求等待时间长 体验不好

   2.为什么会配置服务端?
     1)render (<App/>,document.body)在服务端什么样HTML的document的 nodejs里面没有 而是浏览器提供的
       所以必须重新建sever-entry.js
     2)配置服务端 webpack.config.server.js target环境为node
     3)在package.json 文件里面 执行build命令
       rimraf 清除dist文件夹

       首先清除dist目录 然后客户端打包 再是服务端打包 最后各自的出口打包文件
      build: npm run clear && npm run build:client && npm run build:server

   3.server/server.js  文件夹
     1)将server.entry.js里面的内容渲染到浏览器 这里只是先测试 测试 测试 通过
     2)把服务端渲染出来的 内容 插入到 index.html里面
     3)再把整个index.html返回到浏览器上渲染出来

     4)template.html模板 加载
     5)服务器端将dist下 生成的index.html文件读到server.js里面
五、webpack-dev-server 免去很多手动工作  比如重启服务 重新build
   1.常用配置  webpack-dev-server: 帮我们官方插件 启动服务器 帮我们在webpack中 css js 自动生成的html 并且文件编译存在内存中 我们不需要手动执行build 很快能看到我们想要的效果
   2.Hot module replacement 帮助我们在 改动文件时  无刷新的更新页面内容 免去刷新工作
      1) "dev:client":"cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js"
       执行通过 在指定是开发环境下 用webpack-dev-server 执行打包webpack.config.client.js
       cross-env也是一个包 需要npm安装
      2) cross-env NODE_ENV=development 在Mac下可以直接运行 但在windows上不行

   3.Hot module replacement 什么作用? 自动重启服务 自动刷新页面 而且是自动刷新局部 而不是整个页面刷新
     1)在babelrc  里面加配置
       "plugins":["react-hot-loader/babel"]
     2)安装react-hot-loader@next 3.1.1
     3)改写app.js
        if(module.hot){

           module.hot.accept('./App.js')


         }

六、render方法和hydrate方法 区别 会导致警告 <div>in</div>

七、Hot Module Replacemetn 采坑 编译通过 但浏览器不自动更新
   1.确认代码无误的情况下
   2.重新install 发现能热更新了 说明不是代码逻辑问题 而是版本问题
   3.重新复制所有代码 新建新的项目 通过统一的npm install package.json 安装依赖 热更新也没有问题
     说明一个问题: 安装热更新的插件 不能挨个去安装 需要统一install安装 才行

***************************** 前端热更新打包完成   *****************************

八、后端webpack设置
   1.服务端渲染 会设计到客户端和服务端的bundle


