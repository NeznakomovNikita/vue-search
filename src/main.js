import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
