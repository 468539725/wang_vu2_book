<template>
  <div class="bg">
    <div id="container">
      <div class="box">
        <input class="ipt" ref="userName" type="text" v-model.trim="loginName" placeholder="请输入用户名" maxlegth="5"><br/>
        <input class="ipt" type="text" v-model="code" placeholder="验证码" disabled><br/>
        <input class="ipt" type="password" v-model.trim="loginPwd" placeholder="密码" maxlength="16" minlength="6"><br/>
        <input class="ipt" type="password" v-model.trim="loginPwd1" placeholder="密码" maxlength="16" minlength="6"><br/>
        <div class="btns">
          <el-button class="registerBtn" type="primary" @click="registerInfo">注册</el-button>

          <el-button class="back" type="primary" @click="goBack">返回</el-button>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'Register',
  data() {
    return {
      loginName: '',
      code: '',
      loginPwd: '',
      loginPwd1: '',
      allInfo: []

    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.$refs.userName.focus()

    })
  },
  methods: {
   async registerInfo() {
      if(this.loginPwd===this.loginPwd1) {
        const data = {
          username: this.loginName,
          password: this.loginPwd
        }
        await this.axios({
          method: 'post',
          url: 'http://120.48.99.240:4000/api/register',
          data:qs.stringify(data)
        }).then((res)=>{
          // console.log(res)
          // console.log(res.data)
          // console.log(res.data)
          if(res.data.status===1){
            alert('用户名被占用，请更换后重试！')
          }else{
            alert('注册成功！')
          }
        })
      }else if(this.loginPwd||this.loginPwd1){
        alert('密码验证错误！')
      }

    },
    goBack() {
      this.$router.push({
        name: 'login'
      })

    }
  }


}


</script>

<style scoped lang="css">
* {
  margin: 0;
  padding: 0;

}

#container {
  display: flex;
  justify-content: center;
  opacity: 0.8;
}

.box {
  margin-top: 200px;
  width: 500px;
  height: 400px;
  border-radius: 3px;
  background-color: #B3C0D1;

}

input {
  width: 400px;
  height: 30px;
  border-radius: 3px;
  margin-top: 50px;
  margin-left: 50px;
}

.registerBtn, .back {
  width: 60%;
  height: 50px;
  margin-top: 20px;
  margin-left: 40px;
}

.btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.bg {
  width: 100%;
  height: 745px;
  background-image: url("../../src/assets/2.png");
  background-size: 100% 150%;

}
</style>