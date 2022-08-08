import requests from'./ajax'
import axios from "axios";

export const getMessageListLength=()=>requests.get('/getBookInfo')

export const getMessageListLength1=function (){
  axios.get({
    url:'http://120.48.99.240:4000/getBookInfo'
  }).then(res=>{
    console.log(res.data)
  })
}