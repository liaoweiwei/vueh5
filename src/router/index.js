import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index/index.vue'
import mySelf from '../pages/mySelf/index.vue'
import profile from '../pages/profile/index.vue'
import dropdown from '../pages/dropdown/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: index,
  },{
    path: '/dropdown',
    name: 'dropdown',
    component: dropdown
  },{
    path: '/mySelf',
    name: 'mySelf',
    component: mySelf
  },{
    path: '/profile',
    name: 'profile',
    component: profile
  }]
})
