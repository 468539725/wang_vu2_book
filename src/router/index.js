import VueRouter from 'vue-router'
import NProgress from "nprogress";



const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      name: 'login',
      path: '/',
      component: ()=>import('../pages/login'),
    },
    {
      name: 'register',
      path: '/register',
      component: ()=>import('../pages/register')
    },
    {
      name: 'home',
      path: '/home',
      title: 'Home主页',
      component: ()=>import('../pages/home'),
      props($router) {
        return {
          token:$router.params.token
        }
      }
    }

  ]
})

router.beforeEach((to,from,next)=>{
NProgress.start()
  next()
})

router.afterEach((to,from,next)=>{
  NProgress.done()
})




export default router
