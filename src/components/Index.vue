<template>
  <div id="index">
    <div id="sidebar">
      <div class="aside-wrapper logo-aside-wrapper">
        <img src="../assets/logo.png">
        <transition name="fade">
          <span v-if="!hideMenu">后台管理系统</span>
        </transition>
      </div>
      <ul class="menu-wrapper not-select">
        <template v-for="(item,index) in menu">
          <li class="menu-item"
              :class="{'menu-active':item.active}"
              v-if="item.many === false"
              @click="selectMenu(item.url,index)"
          >
            <i :class="item.icon"></i>
            <transition name="fade">
              <span v-if="!hideMenu" style="width: 154px;display: inline-block;">{{item.name}}</span>
            </transition>
          </li>
          <div v-else>
            <li
              class="menu-item"
              :class="{'menu-many-active':item.active}"
              @click="item.fold = !item.fold"
            >
              <i :class="item.icon"></i>
              <transition name="fade">
                <div v-if="!hideMenu" style="display: inline-block">
                  <span>{{item.name}}</span>
                  <i v-if="item.fold" class="el-icon-arrow-down menu-icon-down"></i>
                  <i v-else class="el-icon-arrow-right menu-icon-down"></i>
                </div>
              </transition>
            </li>
            <ul class="menu-wrapper" v-if="item.fold">
              <template v-for="(child,childIndex) in item.children">
                <li
                  class="menu-item child-item"
                  :class="{'child-active':child.active}"
                  @click="selectMenu(child.url,index,childIndex)"
                >
                  <i :class="child.icon"></i>
                  <transition name="fade">
                    <span v-if="!hideMenu">{{child.name}}</span>
                  </transition>
                </li>
              </template>
            </ul>
          </div>
        </template>
      </ul>
    </div>
    <div id="main">
      <header class="header-wrapper">
        <div class="header-left">
          <p class="menu-fold-icon" @click="hideMenu = !hideMenu"><i class="el-icon-s-grid"></i></p>
          <p class="menu-text">{{menuText}}</p>
        </div>
        <div class="header-right">
          <p class="header-user-img"><img src="../assets/user.jpg"></p>
          <p @click="logout()" style="cursor: pointer">退出</p>
        </div>
      </header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        //菜单
        menu: [
          {name: '一级菜单', icon: 'el-icon-s-tools', url: '/page1', active: false, many: false},
          {name: '四级标题', icon: 'el-icon-user-solid', url: '/home', active: false, many: false},
          {
            name: '二级菜单', icon: 'el-icon-s-cooperation', active: false,fold:false, many: true, children: [
              {name: '子菜单1', icon: 'el-icon-s-comment', url: '/config', active: false},
              {name: '子菜单2', icon: 'el-icon-s-fold', url: '/page2', active: false},
            ]
          },
        ],

        //隐藏菜单标记
        hideMenu  : false,

        //面包屑导航文本
        menuText  : '主页',
      }
    },
    methods: {
      //选择菜单栏
      selectMenu(url, index, child) {
        //单击二级标题
        if (child !== undefined) {
          for (let key in this.menu) {
            key = parseInt(key);
            if (this.menu[key].many) {
              if (index === key) {
                this.menu[key].active = true;
                for (let i in this.menu[key].children) {
                  i = parseInt(i);
                  if (i === child) {
                    this.menu[key].children[i].active = true
                  } else {
                    this.menu[key].children[i].active = false
                  }
                }
              } else {
                this.menu[key].active = false;
                for (let i in this.menu[key].children) {
                  this.menu[key].children[i].active = false
                }
              }
            } else {
              this.menu[key].active = false;
            }
          }
        } else {
          //单机一级标题
          for (let key in this.menu) {
            key = parseInt(key);
            if (this.menu[key].many) {
              this.menu[key].active = false;
              for (let i in this.menu[key].children) {
                this.menu[key].children[i].active = false
              }
            } else {
              if (key === index) {
                this.menu[key].active = true;
              } else {
                this.menu[key].active = false;
              }
            }
          }
        }
        this.locationTo(url);
        this.setMenuActive();
      },

      //路由跳转
      locationTo(url){
        this.$router.push(url);
      },

      //设置选中样式
      setMenuActive(){
        let url   = this.$route.path;
        let menu  = this.menu;
        for(let i in menu){
          if (menu[i].many){//二级菜单
            let childrenMenu  = menu[i].children;//获取子菜单
            let flag          = false;//设置结束循环标记
            for(var j in childrenMenu){
              if(childrenMenu[j].url === url){
                flag                    = true;
                childrenMenu[j].active  = true;
                break;
              }
            }

            if(flag){//找到路由，结束循环
              menu[i].fold    = true;//展开子菜单
              menu[i].active  = true;//设置选中样式
              this.menuText   = menu[i].name+' / '+childrenMenu[j].name;//设置面包屑导航栏文本
              break;
            }
          }else {//一级菜单
            if(menu[i].url === url){
              menu[i].active = true;
              this.menuText = menu[i].name;//设置面包屑导航栏文本
              break;
            }
          }
        }
        this.menu = menu;
      },

      //退出登陆
      logout(){
        $cookies.set('token','');
        this.$router.push('/login');
      }
    },
    created(){
      //设置菜单默认选中
      this.setMenuActive();
    }
  }
</script>

<style scoped>
  #index {
    display: flex;
    width: 100%;
    height: 100%;
    background: #fefefe;
    min-height: 100vh;
  }

  #sidebar {
    background: #20222a;
    color: hsla(0, 0%, 100%, .8);
  }

  #main {
    flex: 1;
    background: #f3f7fd;
  }

  .aside-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-aside-wrapper {
    margin: 20px 0;
    height: 40px;
  }

  .logo-aside-wrapper img {
    height: 100%;
    font-size: 0;
    margin-right: 10px;
  }

  .menu-wrapper {
    background: #515a6e;
    color: hsla(0, 0%, 100%, .7);
    text-align: left;
  }

  .menu-item {
    padding: 14px 24px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    font-size: 14px;
    height: 18px;
    line-height: 18px;
  }

  .menu-icon-down {
    position: absolute;
    right: 24px;
    line-height: 18px;
  }

  .menu-active {
    color: #2d8cf0 !important;
  }

  .menu-item:hover {
    color: #fff;
  }

  .child-active {
    color: #fff;
    background: #2d8cf0 !important;
  }
  .child-item{padding-left: 48px;}
  .menu-many-active{
    color: #fff;
  }
  .header-wrapper{
    display: flex;
    height: 50px;
    border-bottom: none;
    background: #fff;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 10px;
    font-size: 14px;
    color: #666;
  }

  .header-left{
    display: flex;
    align-items: center;
  }
  .menu-fold-icon{
    cursor: pointer;
    font-size: 24px;
  }
  .menu-text{
    margin-left: 10px;
    color: #97a8be;
    cursor: default;
  }

  .header-user-img{
    width: 34px;
    height: 34px;
    background: #ddd;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
  }
  .header-right{
    display: flex;align-items: center;
  }
  .header-user-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
