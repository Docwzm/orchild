import { Component, Vue, Watch } from 'vue-property-decorator'
import TabBar from '@/components/TabBar/TabBar.vue'
import NavBar from '@/components/NavBar/NavBar.vue'

@Component({
    components: {
        TabBar,
        NavBar
    }
})
export default class MainRouter extends Vue {
    transitionName = ''
    /** 监听路由 */
    @Watch('$route')
    private routechange(to: any, from: any) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
    }
}
