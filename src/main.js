import Vue from 'vue'
import App from './App.vue'
import router from './router'
import storeConfig from './store'
import Loader from './components/Loader'
import moment from 'moment'
import './registerServiceWorker'
import 'bootstrap'
import firebaseHandler from './util/firebaseHandler'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store(storeConfig)

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
      error: '' // Error message
    }
  }
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = firebaseHandler.getCurrentUser() || await firebaseHandler.getUser()
    if (!user) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
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
