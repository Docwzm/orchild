import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Login from './views/Login/Login.vue';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta:{
                title:"首页"
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
            meta:{
                title:"关于"
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './views/Login/Login.vue'),
            meta:{
                title:"登录"
            }
        },        
        {
            path: '/invoiceList',
            name: 'invoiceList',
            component: () => import('./views/Medic/InvoiceList/InvoiceList.vue'),
            meta:{
                title:"发票列表"
            }
        },        
        {
            path: '/addInvoice',
            name: 'addInvoice',
            component: () => import('./views/Medic/AddInvoice/AddInvoice.vue'),
            meta:{
                title:"新增发票"
            }
        }
    ]
})


