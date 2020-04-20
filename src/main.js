// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import Element from 'element-ui'
import './styles/element-variables.scss'
import 'es6-promise/auto'

import './styles/index.scss' // global css

import './permission' // permission control

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
