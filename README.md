
# vue管理后台前端框架

实现功能
- 路由中间件
- 面包屑导航栏
- 全局路由与子路由互相跳转

## 中间件设置
`/src/router/index.js`
```
//路由中间件
route.beforeEach((to,from,next)=>{
  let token = $cookies.get('token');
  //验证用户是否登陆
  if(!token && to.path !== '/login'){
    next('/login');
  }else {
    next();
  }
});
```
## 路由设置
`/src/router/index.js`
## 菜单栏设置(子菜单设置完成后，还需设置路由才能完成跳转)
`/src/components/Index.vue`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
