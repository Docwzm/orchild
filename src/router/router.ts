import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Register from '@/views/Register/Register.vue';
import Protocol from '@/views/Protocol/Protocol.vue';
import Category from '@/views/Category/Category.vue'
import Apply from '@/views/Category/Apply/Apply.vue'
import MainRouter from '@/views/MainRouter/MainRouter.vue'
import medicRouter from './modules/medic'
import client from './modules/client'
import category from './modules/category'

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
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: '注册'
            }
        },
        {
            path: '/protocol',
            name: 'protocol',
            component: Protocol,
            meta: {
                title: '用户注册协议'
            }
        },
        {
            path: '/mainPage',
            redirect: 'home', // 子路由默认加载第一个界面
            component: MainRouter,
            children: [
                {// 子路由
                    path: '/home',
                    component: Home,
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: '/category',
                    component: Category,
                    meta: {
                        title: "我的业务"
                    },
                },

            ]
        },
        ...medicRouter,
        ...client,
        ...category
    ]
})
