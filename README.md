# webpack4多页应用脚手架

### 目录结构

```
|-- webpack-multi-cli
    |-- .babelrc                         // babel的配置文件
    |-- .eslintignore                    // eslint忽略检查的配置
    |-- .eslintrc.js                     // eslint的配置文件
    |-- .gitignore                       // 配置忽略git监控的文件
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- build
    |   |-- utils.js                     // 工具函数文件,生成entry和多页htmlWebpackPlugin数组
    |   |-- webpack.base.config.js       // 公用webpack配置文件
    |   |-- webpack.dev.config.js        // 开发环境下webpack配置文件
    |   |-- webpack.prod.config.js       // 生产环境下webpack配置文件
    |   |-- config
    |       |-- index.js                 // webpack配置的快捷入口
    |       |-- pages.js                 // 配置文件目录
    |-- dist                             // 打包后生成的文件夹
    |   |-- home.html
    |   |-- login.html
    |   |-- register.html
    |   |-- static
    |       |-- css
    |       |   |-- home.517ab5ee2e272ea07208.css
    |       |   |-- login.a23531302c539ca7bbb0.css
    |       |   |-- register.88de0a64347445e3dc59.css
    |       |-- img
    |       |   |-- Chris.jpg
    |       |   |-- fly.aeb0eff.jpg
    |       |-- js
    |           |-- home.517ab5ee2e272ea07208.js
    |           |-- login.a23531302c539ca7bbb0.js
    |           |-- register.88de0a64347445e3dc59.js
    |-- src                              // src文件夹
    |   |-- assets                       // 公用资源文件夹,放置公用模块
    |   |   |-- css
    |   |   |   |-- common.scss
    |   |   |-- img
    |   |   |   |-- fly.jpg
    |   |   |-- js
    |   |-- pages
    |       |-- home
    |       |   |-- home.html
    |       |   |-- home.js
    |       |   |-- home.scss
    |       |-- login
    |       |   |-- login.html
    |       |   |-- login.js
    |       |   |-- login.scss
    |       |-- register
    |           |-- register.html
    |           |-- register.js
    |           |-- register.scss
    |-- static                            // 静态资源文件夹,放在这里面的文件不会进行打包
        |-- img
            |-- Chris.jpg
```

### 使用方法

``` bash
# 安装脚手架运行所需要的依赖
npm install

# 开发环境启动本地服务器, 并开始热加载
npm run dev

# 生产环境发布打包
npm run build
```

### TODO
+ 优化src目录下的层级关系
+ 雪碧图
+ 增加简易登录注册页面
+ 优化打包路径


### 具体使用说明
1. 每个页面需要在src/pages目录下新建一个文件夹,将html,css,js放置在这同一个文件夹中
2. 进入build/config/pages对新增的项目路径进行配置
3. 使用npm指令进行开发或者打包操作
4. 注意一: 当在img标签中引用static目录下的图片时,以"./static"开头表示static文件夹
5. 注意二: 当在img标签中引用assets目录下的图片时,应以这种格式引入src=<%= require('@/assets/img/fly.jpg')%>
6. 注意三: 当使用注意二中的格式引用图片时,img标签结尾尖括号前不能写"/"