<template>
  <div id="app">
    <div class="back">
      <div class="header">
        <Header/>
      </div>

      <div id="a" class="b">
        <div class="box">

          &nbsp;&nbsp;&nbsp;&nbsp;
          添加书名:<input type="text" v-model="addPerson" @keyup.enter="addMessage()">
          进行描述：<input type="text" v-model="desc" @keyup.enter="addMessage()">
          <el-button type="info" :plain="true" @click="addMessage()" size="mini" class="addBtn">添加</el-button>

          搜索: <input
            type="text"
            v-model="selectP"
            @keyup.enter="selectInfo"
            placeholder="请输入书名"
        >

          <el-button
              icon="el-icon-search"
              circle size="mini"
              style="margin-left: 16px;"
              @click="selectInfo"
              type="primary">
          </el-button>



          <el-drawer
              title="查询结果"
              :visible.sync="drawer">
            <ol>
              <li v-for="i in filMessageList" :key="i.id">{{ i.bookName }}----{{ i.described }}</li>
            </ol>

          </el-drawer>

          <login-info/>
          <div class="catalogue">
            <Catalogue/>
          </div>

          <div class="msgContainer">

            <ol class="ol">
              <li v-for="m in messageList" :key="m.id" class="li">
                <table class="infoTab">
                  <tr>
                    <td class="td2">
                      {{ m.name }}
                    </td>
                    <td>
                      {{ m.desc }}
                    </td>

                  </tr>
                </table>

                <el-button @click.native="updateMessage(m.id)" type="primary" icon="el-icon-edit" circle size="mini"
                           class="editorBtn"></el-button>
                <el-button @click.native="delMessage(m.id)" type="danger" icon="el-icon-delete" circle size="mini"
                           class="delBtn"></el-button>
                <hr/>
              </li>
            </ol>

            <div class="pag">
              <Pagination
                  :pageNo=pageNo
                  :pageSize="7"
                  :total=total
                  :continues="3"
                  @getPageNo="getPageNo"
              />
            </div>

          </div>
        </div>

        <Footer/>

        <div ref="iform" id="iform">
          <div class="backGround">
            书名：<input type="text" v-model="changeBook" class="iformInput"> <br/>
            描述：<input type="text" v-model="changeDesc" class="iformInput"> <br/>
            <el-button class="iformBtn" @click="confirmMsg">确定</el-button>
            <el-button class="iformBtn" @click="cancelChangeMsg">取消</el-button>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
import Catalogue from '../components/Catalogue'
import loginInfo from "./loginInfo";
import {Loading} from "element-ui";
import qs from 'qs'
import Pagination from "../components/Pagination";

export default {
  name: "B",
  props: ['token'],   //接受路由传过来的参数
  components: {
    Header,
    Catalogue,
    Footer,
    loginInfo,
    Pagination
  },
  data() {
    return {
      drawer: false,
      addPerson: '',
      n: 0,
      selectP: '',
      desc: '',
      changeBook: '',
      changeDesc: '',
      nowId: '',
      messageList: [],
      filMessageList: [],
      loading: false,
      tip: '',//添加或删除弹出提示的内容,
      pageNo: 1,
      pageSize: '',
      total: '',
      continues: '',
      id: 1
    }
  },

  async created() {

    let options = {
      text: '拼命加载中！',
      background: 'rgba(0,0,0,0.8)',
      lock: true
    }
    Loading.service(options)
    if (this.id === 1) {
      this.axios({
        url: 'http://120.48.99.240:4000/getBookInfo',
        method: 'GET'
      }).then(res => {
        this.total = res.data.length
      })


      await this.axios({
        method: 'get',
        url: `http://120.48.99.240:4000/getSingleInfo/?id=${this.id}'`,

        // headers:{
        //   'Authorization':this.token
        // }
      }).then(res => {

        for (let i = 0; i < res.data.length; i++) {
          let obj = {
            id: res.data[i].id,
            name: res.data[i].bookName,
            desc: res.data[i].described
          }
          this.messageList.push(obj)
        }
      })
    }


    let loadingInstance = Loading.service(options);
    loadingInstance.close()


  },
  mounted() {
  },
  methods: {
    async addMessage() {
      const data = {
        bookName: this.addPerson,
        described: this.desc
      }
      if (data.bookName || data.described) {
        await this.axios({
          method: 'POST',
          url: 'http://120.48.99.240:4000/addBook',
          data: qs.stringify(data)
        }).then(res => {
          this.tip = res.data.message
          this.open1()
          this.getPageNo(this.id)
          this.total++
        })
      } else {
        alert('非法输入！')
      }
    },
    open1() {
      this.$notify({
        message: this.tip,
        type: 'success',
        duration: 1000
      });
    },
    updateMessage(getId) {
      this.nowId = getId
      const iform = this.$refs.iform
      iform.style.display = 'block'

      this.messageList.forEach((a) => {
        if (a.id === this.nowId) {
          this.changeBook = a.name
          this.changeDesc = a.desc

        }
      })


    },
    delMessage(getId) {
      const data = {
        id: getId
      }
      this.axios({
        url: 'http://120.48.99.240:4000/deleteBook',
        method: 'post',
        data: qs.stringify(data)
      }).then(res => {
        this.tip = res.data.message
        this.open1()
        this.getPageNo(this.id)
        this.total--
      }).catch(err => {
        console.log(err)
      })

    },
    async confirmMsg() {
      const data = {
        bookName: this.changeBook,
        bookDesc: this.changeDesc,
        Id: this.nowId
      }
      await this.axios({
        method: 'post',
        url: 'http://120.48.99.240:4000/update',
        data: qs.stringify(data)
      }).then(res => {

        this.getPageNo(this.id)
        this.changeBook = ''
        this.changeDesc = ''
        const iform = this.$refs.iform
        iform.style.display = 'none'
      })
    },

    cancelChangeMsg() {
      const iform = this.$refs.iform
      iform.style.display = 'none'
      this.changeBook = ''
      this.changeDesc = ''


    },

    selectInfo() {
      this.filMessageList = []
      if (this.selectP.trim() === '') {
        alert('查询不能为空！')
      } else {
        this.drawer = true
        this.selectP = this.selectP.trim()
        this.axios({
          url: `http://120.48.99.240:4000/searchInfo?bookName=${this.selectP}`,
          method: 'GET'
        }).then(res => {
          if (res.data.length === 0) {
            this.filMessageList = []
          } else {
            for (let i = 0; i < res.data.length; i++) {
              this.filMessageList.push(res.data[i])
            }


          }

        }).catch(err => {
          console.log(err)
        })
        this.selectP = ''
      }

    },
    getPageNo(nowPage) {

      this.pageNo = nowPage
      this.id = nowPage
      this.axios({
        method: 'get',
        url: `http://120.48.99.240:4000/getSingleInfo/?id=${this.id}'`,

        // headers:{
        //   'Authorization':this.token
        // }
      }).then(res => {
        // console.log(res.data)
        this.messageList = []
        for (let i = 0; i < res.data.length; i++) {
          let obj = {
            id: res.data[i].id,
            name: res.data[i].bookName,
            desc: res.data[i].described
          }
          this.messageList.push(obj)
        }

      })


    }
  }

}
</script>


<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}


.msgContainer {
  margin-top: 30px;


}

#a {

  height: 100%;
  padding-top: 20px;

  input {
    width: 200px;
    height: 25px;
    border-radius: 3px;

  }

}

hr {
  opacity: 0.5;
  margin-top: 20px;
}

li button {
  display: none;
}

li {
  padding: 10px;
  border: 1px;
  margin-left: 45px;
  //width: 90%;
}


li:hover {
  background-color: #ddd;
  opacity: 0.5;

  button {
    float: right;
    position: relative; /*????????*/
    margin-left: 20px;
    display: block;
  }

}

.addBtn {
  margin: 5px;
  width: 54px;
  height: 32px;
}

p {
  text-align: center;
  opacity: 0.5;
}

td {
  width: 320px;

}

.td2 {
  padding-left: 40px; /*????????*/
}

#iform {
  position: fixed;
  left: 500px;
  top: 200px;
  width: 400px;
  height: 250px;
  border-radius: 3px;
  display: none;
  text-align: center;
  background-color: #B3C0D1;
  opacity: 0.8;

}

.iformInput {
  margin-top: 50px;
  border-radius: 3px;
}

.iformBtn {
  margin-top: 20px;
  margin-left: 5px;
  width: 80px;
  height: 40px;
}

.backGround {
  width: 100%;
  height: 100%;

}

.pag { //分页位置
  display: flex;
  justify-content: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;

}

.header {
  height: 10vh;
}
.catalogue{
  height: 10vh;
}

</style>