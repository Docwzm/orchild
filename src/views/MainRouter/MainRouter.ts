import { Component, Vue } from 'vue-property-decorator'
import TabBar from '@/components/TabBar/TabBar.vue'
import NavBar from '@/components/NavBar/NavBar.vue'

@Component({
    components: {
        TabBar,
        NavBar
    }
})
export default class MainRouter extends Vue {
    // private created () {
    //     let token = this.$route.query.token
    //     console.log(this.$route.query.token)
    //     console.log('load:', token)
    // }
    // private mounted () {
    //     let token = this.$route.query.token
    //     console.log(this.$route.query.token)
    //     console.log('load:', token)
    // }
}
