import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.ts'
import 'lib-flexible/flexible' // 适配
// import '@/utils/jsencrypt.min.ts'
// import JsEncrypt from 'jsencrypt'
// import { JSEncrypt } from 'jsencrypt'
// Vue.prototype.$jsEncrypt=JsEncrypt
// window.JSEncrypt=JSEncrypt

// 引入vant
import 'vant/lib/index.css'
import { Button, Field, CellGroup, Cell, Toast, List,Picker,Popup } from 'vant'
Vue.use(Button)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(Toast)
    .use(List)
    .use(Picker)
    .use(Popup)

Vue.config.productionTip = false


// 全局引用fitler
import * as filters from "./filters";
Object.keys(filters).forEach((key)=>{
    Vue.filter(key,filters[key]);
});

// 全局混入
Vue.mixin({
    methods: {
        storeBusinessInfo() {

            return new Promise((resolve, reject) => {

                // let token = localStorage.getItem("token");

                let token = this.$route.query.token;
                console.log("token123:", this.$route.query.token);
                // 获取用户信息
                if (token && token != "") {
                    localStorage.setItem("token", token);
                    // 取用户相关信息 
                    this.$store.dispatch("GetLoginUserInfo").then(()=>{
                        console.log("123");
                        resolve()
                    });

                    // 取数据字典
                    this.$store.dispatch("getDictionaryData")
                }

                // 当前选中金融产品Id
                let selectProductId = this.$route.query.selectProductId;
                if (selectProductId && selectProductId != "") {
                    this.$store.commit("setSelectProductId", selectProductId);
                }
            })
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
