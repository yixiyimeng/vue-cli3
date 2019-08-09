import Vue from 'vue'
import App from './App.vue'
// import '@/assets/reset.css'//初始样式设置
import "@babel/polyfill" //用来兼容ie
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
