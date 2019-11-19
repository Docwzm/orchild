import { Component, Vue } from 'vue-property-decorator';


@Component({})
export default class NoData extends Vue {
    data = {
        status: 1
    }

    jumpPage() {
        // wx.switchTab({ url:'/pages/home/index'})
        this.$router.push('/home');
    }
    lookLog() {
        this.$router.push('/businessList');
        // this.__app.data.__loglistdata={}
        // wx.navigateTo({
        //     url: '/userBusiness/log/log'
        // })
    }
}
