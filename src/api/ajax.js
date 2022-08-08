import axios from 'axios'
const requests=axios.create({
  baseurl:"http://120.48.99.240:4000",
  timeout:5000
})

requests.interceptors.response.use((res)=>{

  return res.data
},()=>{
  return Promise.reject(new Error('faile'))
})
export default requests