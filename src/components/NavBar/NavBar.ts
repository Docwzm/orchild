import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class TabBar extends Vue {
    private created () {
        console.log(this.$route.meta.title)
    }
}
