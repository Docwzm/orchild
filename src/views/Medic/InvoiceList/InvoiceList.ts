import { Component, Vue } from 'vue-property-decorator'
import { Toast } from 'vant'
import { UserService, MedicService } from '@/api'

@Component({})
export default class InvoiceList extends Vue {
    // username: string = 'hx12345'
    // password: string = 'a123456'

    list = []
    loading = false
    finished = false
    storeBusinessInfo:any

    private onLoad () {

    }

    private created () {
        this.storeBusinessInfo().then(() => {
            console.log(234)
            this.getInvoiceList()
        })

        // let token = this.$route.query.token;
        // console.log("tokenasf:",this.$route.query.token);
    }

    private async getInvoiceList () {
        let params = {
            productId: this.$store.getters.selectProductId,
            queryInfo: ''
        }
        const { data } = await MedicService.getInvoiceList(params)
        this.list = data
        // console.log("invoiceList:",data);
    }

    private toAddInvoice () {
        this.$router.push('/addInvoice')
    }
}
