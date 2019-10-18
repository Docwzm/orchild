import Vue from 'vue'
import router from './router'

// 全局监听router
router.beforeEach((to, from, next) => {
    // 这里能够跟踪路径的变化
    console.log('from:', from)
    console.log('to:', to)

    // 路由发生变化修改页面title
    if (to.meta.title) {
        document.title = to.meta.title
    }

    // 最后通过钩子继续页面的跳转
    next()
})
