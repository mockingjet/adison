import Vue from 'vue'
import './plugins/axios'
import i18n from './plugins/lang/lang.js'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'animate.css'
import swal from 'sweetalert2';
import qs from 'qs';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false
Vue.prototype.swal = swal;
Vue.prototype.qs = qs;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
