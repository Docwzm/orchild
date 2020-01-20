import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Register from '@/views/Register/Register.vue';
import Protocol from '@/views/Protocol/Protocol.vue';
import ResetPwd from '@/views/ResetPwd/ResetPwd.vue';
import Category from '@/views/Category/Category.vue';
import Contract from '@/views/Contract/ContractShow/ContractShow.vue'
import MainRouter from '@/views/MainRouter/MainRouter.vue'
import medicRouter from './modules/medic'
import client from './modules/client'
import category from './modules/category'
import profileRouter from "./modules/profile";
import contractRouter from "./modules/contract";
import ranchRouter from "./modules/ranch";
import Result from '@/views/Common/Result/Result.vue'
import UserInfo from "@/views/UserCenter/UserInfo/UserInfo.vue";

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
            path: '/',
            redirect: 'home', // 子路由默认加载第一个界面
            component: MainRouter,
            children: [
                {// 子路由
                    path: '/home',
                    component: Home,
                    meta: {
                        title: '首页',
                        navShow:false,
                        keepAlive:true
                    }
                },
                {
                    path: '/category',
                    component: Category,
                    meta: {
                        title: "我的业务",
                        navShow:false,
                        keepAlive:false
                    },
                },
                {
                    path: '/contract',
                    component: Contract,
                    meta: {
                        title: "我的合同",
                        navShow:false,
                        keepAlive:false
                    },
                },
                {
                    path: '/user',
                    name: 'user',
                    component: UserInfo,
                    meta: {
                     title: '个人中心',
                     navShow:false,
                     keepAlive:true 
                    }
                }

            ]
        },
        ...medicRouter,
        ...client,
        ...category,
        ...profileRouter,
        ...contractRouter,
        ...ranchRouter
    ]
})
