<template>
  <div class="login">
    <div class="loginCenter">
      <div class="loginTitle">{{ title }}</div>
      <p>请输入用户名:<i class="el-icon-user"></i><input ref="userName" type="text" v-model="loginName" placeholder="请输入用户名"/></p>
      <p>请&nbsp;输&nbsp;入密&nbsp;码:<i class="el-icon-key"></i><input type="password" v-model="password" placeholder="请输入密码"/>
      </p>

      <br/>
      <div class="loginBtn">
        <el-button type="primary" @click.prevent="toHome" size="mini" class="el-button">登录</el-button>
        <el-button type="primary" @click="toRegister" size="mini" class="el-button">去注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Login',
  data() {
    return {
      loginName:'',
      password: '',
      title: '登录页面',
      token:''
    }
  },
  mounted() {
  this.$nextTick(()=>{
    this.$refs.userName.focus()
  })
    },
  methods: {
    async toHome() {
      const data = {
        username: this.loginName,
        password: this.password
      }
      await this.axios({
        method: 'POST',
        url: 'http://120.48.99.240:4000/login',
        // url:'http://127.0.0.1:8888/api/login',
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data)
      }).then(res=> {
        // console.log(res.data)
        // console.log(res.data.token)
        this.token=res.data.token
        if (this.token!==''&&this.token!==undefined){
          // console.log(this.token)
          this.$router.push({
            name:'home',
            params:{
              token:this.token,
              loginName:this.loginName
            }
          })
      }else{
          alert('用户名或密码错误！')
        }
      }).catch((err)=>{
        console.log(err)
        alert('用户名或密码错误！')
      })
    },

    toRegister() {
      this.$router.push({
        name: 'register'
      })
    }

  }
}
</script>


<style scoped lang="less">

p {
  text-align: center;
  margin-top: 15px;
}

.login {
  width: 100%;

  height: 745px;
  background-image: url("../assets/2.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;



}


.loginCenter {
  width: 300px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 24px;
}

.loginTitle {
  text-align: center;
  margin-bottom: 20px;
}

.loginBtn {
  text-align: center;
  margin-top: 5px;
}

</style>