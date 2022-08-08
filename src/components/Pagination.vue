<template>
  <div class="pagination">
    <button class="up" :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.star" @click="$emit('getPageNo',1)" :class="{active:pageNo===1}">1">1</button>
    <button v-if="startNumAndEndNum.start>2">...</button>

<!--    中间部分-->
    <template v-for="(page,index) in startNumAndEndNum.end">
      <button v-if="page>=startNumAndEndNum.start"
              :key="index"
              @click="$emit('getPageNo',page)"
              :class="{active:pageNo===page}"

      >{{page}}</button>

    </template>


    <button v-if="startNumAndEndNum.end<totalPage-1">...</button>
    <button  v-if="startNumAndEndNum.end<totalPage"
             @click="$emit('getPageNo',totalPage)"
             :class="{active:pageNo===totalPage}"
    >{{totalPage}}</button>
    <button class="down"
            :disabled="pageNo===totalPage"
            @click="$emit('getPageNo',pageNo+1)"


    >下一页</button>
    <button style="margin-left: 30px" class="all">共{{total}}条</button>

  </div>



</template>

<script>

export default {
  name:'Pagination',
  props:['pageNo','pageSize','total','continues'],
mounted() {

},
  computed:{
    totalPage(){
      return  Math.ceil(this.total/this.pageSize)
    },
    //计算连续页码的起始数字与结束的数字
    startNumAndEndNum(){
      let start=0,end=0   //起始数字与结束数字
      //连续的页码数为5--》至少为5页  为正常情况
      //总页数没有连续页码数量多  start为1 end为totalPage
      if(this.continues>this.totalPage){
        start=1
        end=this.totalPage
      }else{
        //连续页码数小于totalPage（小于总页数）
        start=this.pageNo-parseInt(this.continues/2)
        //结束数字
        end=this.pageNo+parseInt(this.continues/2)
        //把不正常的现象start<0纠正
        if(start<1){
          start=1
          end=this.continues
        }
      //end比总页码大
        if(end>this.totalPage){
          end=this.totalPage
          start=this.totalPage-this.continues+1
        }


      }
      return {start,end}

    }
  },
  methods:{


  }

}
</script>

<style scoped>

button{
  width: 35px;
  height: 30px;
  margin-left: 5px;
  border-radius: 4px;
}
.up,.down{
  width: 45px;
  margin-bottom: 0;
}
.all{
  width: 55px;
}
.active{
  background-color: skyblue;
}

</style>
