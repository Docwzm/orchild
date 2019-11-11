import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import 'lib-flexible/flexible' // 适配
import '@/router/routerWatcher' // 权限
import '@/mixins' // 权限

// 引入vant
import 'vant/lib/index.css'
import {
    Button, Field, CellGroup, Cell, Toast, List, Picker, Popup, Tabbar,
    TabbarItem, Skeleton, NavBar, Image, Icon, Progress, Sticky, Radio, RadioGroup, Checkbox, Uploader,
    DropdownMenu, DropdownItem, Circle
} from 'vant'

// 全局引用fitler
import filterobj from './filters'
Vue.use(Button)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(Toast)
    .use(List)
    .use(Picker)
    .use(Popup)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Skeleton)
    .use(NavBar)
    .use(Image)
    .use(Icon)
    .use(Progress)
    .use(Sticky)
    .use(Radio)
    .use(RadioGroup)
    .use(Checkbox)
    .use(Uploader)
    .use(DropdownMenu)
    .use(DropdownItem)
    .use(Circle)
// toast 设置默认值
Toast.setDefaultOptions({
    duration: 3000, // 持续展示 toast
    forbidClick: true
})

// 阻止生成生产警告消息
Vue.config.productionTip = false
Object.keys(filterobj).forEach((key) => {
    Vue.filter(key, filterobj[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
