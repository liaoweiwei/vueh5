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
    meta: {
      requireAuth: false
    }
  },{
    path: '/dropdown',
    name: 'dropdown',
    component: dropdown,
    meta: {
      requireAuth: false
    }
  },{
    path: '/mySelf',
    name: 'mySelf',
    component: mySelf,
    meta: {
      requireAuth: true
    }
  },{
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: {
      requireAuth: false
    }
  }]
})
