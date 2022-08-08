<template>


  <div class="loginInfo">
    <p>{{ nowDate }}&nbsp;<span>{{ name }}</span></p>
    <div class="exitLogin">
      <button @click="exitBtn">退出</button>
    </div>

  </div>

</template>


<script>


export default {
  name: 'LoginInfo',
  data() {
    return {
      nowDate: '',
      name:''
    }
  },
  methods: {
    exitBtn() {
      this.$router.push({
        name: 'login',
      })
    },
  },
  mounted() {
    const data = new Date().getHours()
    if (data >= 7 && data < 11) {
      this.nowDate = '上午好!~'
    } else if (data >= 11 && data < 13) {
      this.nowDate = "中午好！~"
    } else if (data >= 13 && data <= 19) {
      this.nowDate = '下午好！~'
    } else {
      this.nowDate = '晚上好！~'
    }


    this.axios({
      url: "http://120.48.99.240:4000/backLoginName",
      method: 'get'
    }).then(res => {
      this.name=res.data
    })


  },


}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.loginInfo {
  width: 20%;
  height: 58px;
  /*border:1px solid sandybrown;*/
  float: right;
  border-radius: 3px;
  background-color: #B3C0D1;
  opacity: 0.8;

}

.exitLogin {
  text-align: center;
  position: relative;
  top: 10px;

}

span {
  text-decoration: underline;
  font: 20px "隶书";

}

button {

  width: 55px;
  height: 20px;
  font: 10px "微软雅黑 Light";
  background-color: blanchedalmond;
  border-radius: 3px;


}

p {
  text-align: center;
}
</style>