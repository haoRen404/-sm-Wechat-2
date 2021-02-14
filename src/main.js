import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入全局样式
import './assets/css/global.css'
// 引入阿里图标
import "./assets/font/iconfont.css"
// 引入线条背景试试有没有用
// import './assets/js/xiantiao.js'

// 引入semantic ui失败
// import "https://cdn.jsdelivr.net/semantic-ui/2.2.4/semantic.min.css"
// import "./assets/semanticUi/jquery-1.11.3.js"
// import "./assets/semanticUi/semantic.js"
// import "./assets/semanticUi/semantic.css"


// 导入axios
import axios from 'axios'
// 挂载axios
Vue.prototype.$http = axios
// 设置访问根路径(后端的路径,跨域请求时不需要再写这部分)
axios.defaults.baseURL = "http://localhost:9000/"


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
