import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'

// 引入vant
import 'vant/lib/index.css'
import { Button, Field, CellGroup, Toast } from 'vant'
Vue.use(Button)
    .use(Field)
    .use(CellGroup)
    .use(Toast)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
