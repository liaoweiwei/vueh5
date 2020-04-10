#  demo

> vue-cli脚手架构建的项目结构：

解决方法：

1、安装babel-polyfill包；

npm install babel-polyfill --save-dev

安装完之后，在package.json文件中显示：


2、在main.js文件中引入babel-polyfill；


3、在webpack.base.config.js中将entry中的app: './src/main.js'配置改为：app: ['babel-polyfill', './src/main.js']；


## Build Setup

``` bash
# 安装依赖（注意查看package.json里面模块的安装版本号）
npm install

# 运行
npm run dev

# 打包（打包到dist目录)
npm run build

```

