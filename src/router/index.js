import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Home from '../components/Home'
import Config from '../components/Config'
import Login from '../components/Login'
import Page1 from '../components/Page1'
import Page2 from '../components/Page2'

Vue.use(Router);

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children :[
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/config',
          name: 'Config',
          component: Config
        },
        {
          path: '/page1',
          name: 'Page1',
          component: Page1
        },
        {
          path: '/page2',
          name: 'Page2',
          component: Page2
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ]
});

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
export default route;
