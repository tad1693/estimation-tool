import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loader from './components/Loader'
import moment from 'moment'
import './registerServiceWorker'
import 'bootstrap'
import firebaseHandler from './util/firebaseHandler'

Vue.component('loader', Loader)
Vue.filter('twoDecimals',
  (value) => {
    return parseFloat(value.toFixed(2))
  }
)
Vue.filter('formatDate', (dateString) => {
  return moment(dateString).format('ddd MMM Do YY')
})
Vue.mixin({
  data () {
    return {
      loading: false, // Loading flag
      error: '' // Error message
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebaseHandler.getUser()) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      console.log('authenticated')
      next()
    }
  } else {
    next()
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
