import Vue from 'vue'
import App from './App'
import store from './store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store  //手机app这样挂在才能使用vuex

const app = new Vue({
	 store,  //全局挂在vuex
    ...App
})
app.$mount()
