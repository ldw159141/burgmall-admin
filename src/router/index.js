import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      { 
    path: '/user',
    name: '商家用户管理',
    component: ()=> import('../views/UserManager.vue')
   },

   { 
    path: '/goods',
    name: '商品管理',
    component: ()=> import('../views/GoodsManager.vue')
   },
      
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
   {
    path: '/login',
    name: '登录',
    component: ()=> import('../views/Login.vue')
   }
   
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
