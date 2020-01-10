import { Component, Vue, Prop,Watch} from 'vue-property-decorator'

@Component({})
export default class TabBar extends Vue {
    title=''
    navShow=false
    created () {
        console.log(this.$route.meta.title)
    }
    mounted(){
        // this.navShow=this.$route.meta.navShow
        // this.title=this.$route.meta.title
    }
  
    onClickLeft() {
        // 点击回退的时候当做地址回退
        this.$router.go(-1);
    }
}
