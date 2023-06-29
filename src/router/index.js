import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      { 
    path: '/user',
    name: '商家用户管理',
    component: ()=> import('../views/UserManager.vue')
   },
   { 
    path: '/address',
    name: '地址模块',
    component: ()=> import('../views/AddressManager.vue')
   },
   { 
    path: '/role',
    name: '权限类别',
    component: ()=> import('../views/RoleManager.vue')
   },

   { 
    path: '/goods',
    name: '商品管理',
    component: ()=> import('../views/GoodsManager.vue')
   },

   { 
    path: '/type',
    name: '商品类别',
    component: ()=> import('../views/TypeManager.vue')
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
    path: '/',
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
