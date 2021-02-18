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
// 导入axios
import axios from 'axios'
// 让ajax携带cookie
// axios.defaults.withCredentials = true
// 挂载axios
Vue.prototype.$http = axios
// 设置访问根路径(后端的路径,跨域请求时不需要再写这部分)
axios.defaults.baseURL = "http://localhost:9000/"


// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
　　    // 在发送请求之前做些什么
        if (window.localStorage.getItem('token')) {
            // 设置请求头参数
            config.headers.Token  = window.localStorage.getItem('token').replace(/^\"|\"$/g,'');
        }
        return config
    }, 
    function (error) {
        // 对请求错误做些什么
        console.log("请求error了哦")
        return Promise.reject(error)
    }
);

     
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
　　// 对响应数据做点什么
　　return response
}, function (error) {
　　// 对响应错误做点什么
    console.log("响应error了哦")
　　return Promise.reject(error)
});  

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
