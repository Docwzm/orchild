# test2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### git分支  如果拉个人开发分支规范    例如：client_qmh_xxx
1.base:基础框架
2.client：中银金链
3.common：共通模块（例如合同）
4.message：消息模块
5.partner：合作伙伴
6.report：报表模块

###  git 分支合并
例如 report_yw_dev  要合并代码到report ,
1.git checkout report
2.git pull origin report
3.git checkout report_yw_dev
4.git merge report (有冲突解决冲突)
5.git add... git commit ..
6.git push origin report_yw_dev
7.gitlab 发起merge 请求

### 项目目录

├── README.md            项目介绍
├── index.html           入口页面
├── public            入口页面目录
│  ├── index.html         入口页面
│  └── favicon.ico            图标
├── config             项目配置
│  ├── dev.env.js           开发环境变量
│  ├── index.js            项目配置文件
│  ├── prod.env.js           生产环境变量
│  └── test.env.js           测试环境变量
├── mock              mock数据目录
│  └── hello.js
├── package.json          npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src               源码目录  
│  ├── api           公共http请求api
│  │  └── index.ts
│  ├── assets             资源目录，这里的资源会被wabpack构建
│  │  └── images
│  │    └── logo.png
│  ├── components               自定义组件库
│  │  └── ..
│  ├── directive                自定义指令
│  │  └── images
│  ├── filters                  自定义过滤器
│  │  └── index.ts      
│  ├── mixins                   自定义混合方法
│  │  └── index.ts  
│  ├── router                   前端路由
│  │  ├── routerWatcher.ts          路由监听
│  │  └── router.ts                 配置具体路由  
│  ├── scss                     前端共通样式
│  │  ├── button.scss               共通button
│  │  ├── form.scss                 表单样式
│  │  ├── init.scss                 工程初始化样式
│  │  ├── list.scss                 列表样式
│  │  ├── main.scss                 引用输出所有样式
│  │  ├── region.scss               区域-header footer等
│  │  ├── toast.scss                提示消息
│  │  └── variable.scss             共通变量 
│  ├── store                    应用级数据（state）
│  │  ├── modules                  模块
│  │  └── index.ts   
│  ├── utils                    工具
│  │  └── request.ts                共通请求  
│  ├── views.ts                 业务页面
│  │  └── Login                     登录
│  ├── main.ts                  入口文件
│  ├── app.vue                  根组件
│  ├── shims-tsx.d.ts              
│  └── shims-vue.d.ts          
├── static             纯静态资源，不会被wabpack构建。
└── vue.config.js              webpack 配置文件