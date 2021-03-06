import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class TabBar extends Vue {
    currIndex: number = 0
    active: number = 0
    tabbars: any = [
        {
            name: 'home',
            title: '首页',
            normal: 'https://pictures.guanggujinxin.com/clientmini/focus9.png',
            active: 'https://pictures.guanggujinxin.com/clientmini/select8.png'
        },
        {
            name: 'category',
            title: '我的业务',
            normal: 'https://pictures.guanggujinxin.com/clientmini/focus10.png',
            active: 'https://pictures.guanggujinxin.com/clientmini/select11.png'
        },
        {
            name: 'contract',
            title: '我的合同',
            normal: 'https://pictures.guanggujinxin.com/clientmini/focus12.png',
            active: 'https://pictures.guanggujinxin.com/clientmini/select13.png'
        },
        {
            name: 'user',
            title: '个人中心',
            normal: 'https://pictures.guanggujinxin.com/clientmini/focus14.png',
            active: 'https://pictures.guanggujinxin.com/clientmini/select15.png'
        }
    ]

    mounted() {
        this.active = this.$store.state.base.tabBarActiveIndex
        // this.currIndex = this.$store.state.base.tabBarActiveIndex;
    }
    tab(index: any, val: any) {
        //   this.currIndex = index;
        this.$store.commit("setTabBarActiveIndex", index)
        this.$router.push(val);
    }
}
