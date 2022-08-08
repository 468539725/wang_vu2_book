<template>
  <div class="container">
    <table>
      <tr>
        <td class="td1">序号</td>
        <td class="td2">书名</td>
        <td class="td3">描述</td>
        <td class="do">操作</td>
      </tr>
    </table>
  </div>


</template>
<script>
export default {
  name: 'Catalogue',


}

</script>

<style scoped>

.container {
  margin-top: 20px;
  height: 100%;
  border: 1px solid skyblue;
  background-color: #ddd;
}

td {
  width: 200px;
  height: 50px;
  padding-left: 50px;
  text-align: left;
}

.td1 {
  width: 50px;
  padding-left: 10px;
}
.td2{
  margin-left: 20px;

}
.td3{
  padding-left: 100px;
}
.do{
  width: 60%;
  text-align: right;
  padding-right: 45px;
}

</style>