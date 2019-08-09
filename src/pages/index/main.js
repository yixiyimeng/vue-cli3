import Vue from "vue";
import App from "./App.vue";
import router from "./router";//路由
import store from "./store/";//vuex 状态管理
import {VueAxios} from "@/utils/request";//接口请求
import "./registerServiceWorker";//静态资源缓存
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'
import '@/assets/reset.css'//初始样式设置
import "@babel/polyfill" //用来兼容ie
import './permission'//权限路由处理
//import './components' //按需加载的ant-design 样式
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  VueAxios,
  render: h => h(App)
}).$mount("#app");
