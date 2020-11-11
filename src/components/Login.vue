<template>
  <div id="login">
    <div class="model" v-if="notLogin">
      <div class="model-wrapper">
        <p class="model-title">登陆后台管理系统</p>
        <el-form label-width="80px" :model="loginData" label-position="left">
          <el-form-item label="用户名称">
            <el-input v-model="loginData.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="loginData.password" placeholder="请输入用户密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="login()">登陆</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Ajax from "../assets/js/ajax.js";
  export default {
    name: "Login",
    data() {
      return {
        //是否登录
        notLogin: true,

        loginData: {
          username: '',
          password: ''
        }
      }
    },
    methods:{
      //用户登陆
      login() {
        $cookies.set('token','123');
        this.$router.push('/');
      },
    },
    created(){
      let token = $cookies.get('token');
      if (token) {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  #login {
    min-height: 100vh;
    overflow: hidden;
    background: url("../assets/image/bg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .model {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .model-wrapper {
    width: 400px;
    height: auto;
    background: rgb(255, 255, 255);
    border-radius: 3px;
    padding: 30px;
  }

  .model-title {
    text-align: center;
    line-height: 30px;
    margin: 0;
    margin-bottom: 15px;
  }
</style>
