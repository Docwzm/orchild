import { Component, Vue } from 'vue-property-decorator'
import { Toast } from 'vant'
import UserService from '@/api/user.service'

@Component({})
export default class InvoiceList extends Vue {

    // username: string = 'hx12345'
    // password: string = 'a123456'   

    list = []
    loading = false
    finished = false

    private created() {  
        this.storeBusinessInfo();

        // let token = this.$route.query.token;
        // console.log("tokenasf:",this.$route.query.token);
    }

    private onLoad() {
        // 异步更新数据
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1);
            }
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= 40) {
                this.finished = true;
            }
        }, 500);
    }

}
