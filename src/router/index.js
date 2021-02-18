import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入login组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Blog from '../components/main/blogList'
import Index from '../components/main/index'

{/* <script type="text/javascript" color="47,135,193" opacity='0.5' zIndex="-2" count="199" src="http://cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js"></script> */
}

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        // 重定向到登录页
        redirect: "/login"
    }, {
        path: "/login",
        component: Login
    }, {
        path: "/home",
        component: Home,
        // redirect: '/welcome',
        children: [
            {path: '/index', component: Index},
            {path: '/blog', component: Blog},
            // { path:'/user', component: User}
        ],
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
// 三个参数:(to,from,next),to是要访问什么,from是从哪来,next是要做什么
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();// 如要访问的是login则不拦截
    // 获取user
    // const userFlag = window.localStorage.getItem("user");// 取出当前用户
    // 获取token
    const tokenFlag = window.localStorage.getItem("user");// 取出当前token
    if (!tokenFlag) return next('login');// 无值说明没登录,跳转到login
    next();// 符合要求,放行
})


// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}


// 暴露出去
export default router
