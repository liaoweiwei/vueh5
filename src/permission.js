import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  
  if (to.meta.requireAuth) {
    if (Number(store.getters.isAuthenticate) === 1) {
      next()
    }else {
      next({ path: '/' })
      NProgress.done()
    }
  }else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
