import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import 'lib-flexible/flexible' // 适配
import '@/router/routerWatcher' // 权限
import '@/mixins' // 权限


import VuePreview from 'vue-preview' // 图片预览移动放大缩小插件

// 引入vant
import 'vant/lib/index.css'
import {
    Button, Field, CellGroup, Cell, Toast, List, Picker, Popup, Tabbar, Area,
    TabbarItem, Skeleton, NavBar, Image, Icon, Progress, Sticky, Radio, RadioGroup, Checkbox, Uploader,
    DropdownMenu, DropdownItem, Circle, DatetimePicker, Steps, Step, NoticeBar, NumberKeyboard, Collapse, CollapseItem,
    Divider, Panel,Dialog 
} from 'vant'

import { OrchidComponents } from '@/components'




// 全局引用fitler
import filterobj from './filters'
import Utils from './utils/utils'
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
    .use(Steps)
    .use(Step)
    .use(Area)
    .use(NoticeBar)
    .use(NumberKeyboard)
    .use(DatetimePicker)
    .use(Divider)
    .use(Collapse)
    .use(CollapseItem)
    .use(Panel)
    .use(Dialog )

Vue.use(OrchidComponents);

Vue.use(VuePreview, {
    fullscreenEl: false, //控制是否显示右上角全屏按钮
    closeEl: false, //控制是否显示右上角关闭按钮
    tapToClose: true, //点击滑动区域应关闭图库
    shareEl: false, //控制是否显示分享按钮
    zoomEl: false, //控制是否显示放大缩小按钮
    counterEl: false, //控制是否显示左上角图片数量按钮
    arrowEl: false,  //控制如图的左右箭头（pc浏览器模拟手机时）
    tapToToggleControls: true, //点击应切换控件的可见性
    clickToCloseNonZoomable: true //点击图片应关闭图库，仅当图像小于视口的大小时
})

// toast 设置默认值
Toast.setDefaultOptions({
    duration: 3000, // 持续展示 toast
    forbidClick: true
})

// 全局常量
import constants from "@/utils/constants.ts";
Vue.prototype.$constants = constants;

// 阻止生成生产警告消息
Vue.config.productionTip = false
Object.keys(filterobj).forEach((key) => {
    Vue.filter(key, filterobj[key])
})
Vue.prototype.$utils = Utils
declare module 'vue/types/vue' {
    interface Vue {
        $utils: any,
        $constants: any
    }
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
