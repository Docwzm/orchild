import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
import MainRouter from '@/views/MainRouter/MainRouter.vue'
import medicRouter from './modules/medic'
import client from './modules/client'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ '@/views/Login/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/mainPage',
            redirect: 'home',//子路由默认加载第一个界面
            component: MainRouter,
            children: [
                {//子路由
                    path: '/home',
                    component: Home,
                    meta: {
                        title: '首页'
                    }
                }
            ]
        },
        ...medicRouter,
        ...client
    ]
})
