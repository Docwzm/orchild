import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Register from '@/views/Register/Register.vue';
import Protocol from '@/views/Protocol/Protocol.vue';
import Authentication from '@/views/Authentication/Authentication.vue';
import AuthCertificate from '@/views/Authentication/AuthCertificate/AuthCertificate.vue';
import AuthDetail from '@/views/Authentication/AuthDetail/AuthDetail.vue';
import ResetPwd from '@/views/ResetPwd/ResetPwd.vue';
import Category from '@/views/Category/Category.vue'
import Apply from '@/views/Category/Apply/Apply.vue'
import MainRouter from '@/views/MainRouter/MainRouter.vue'
import medicRouter from './modules/medic'
import client from './modules/client'
import category from './modules/category'
import Result from '@/views/Common/Result/Result.vue'
import AuthFace from "@/views/Authentication/AuthFace/AuthFace";
import User from "@/views/UserCenter/User/User.vue";

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
            path: '/result',
            name: 'result',
            component: Result,
            meta: {
                title: '结果'
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
            path: '/resetPwd',
            name: 'resetPwd',
            component: ResetPwd,
            meta: {
                title: '重置密码'
            }
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Authentication,
            redirect: 'authCertificate',
            children: [
                {
                    path: '/authCertificate',
                    name: 'certificate',
                    component: AuthCertificate,
                    meta: { title: '实名认证' }
                },
                {
                    path: '/authDetail',
                    name: 'detail',
                    component: AuthDetail,
                    meta: { title: '实名认证' }
                },
                {
                    path: '/authFace',
                    name: 'face',
                    component: AuthFace,
                    meta: { title: '实名认证' }
                }
            ]
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
                {
                    path: '/user',
                    name: 'user',
                    component: User,
                    meta: { title: '个人中心' }
                }

            ]
        },
        ...medicRouter,
        ...client,
        ...category
    ]
})
