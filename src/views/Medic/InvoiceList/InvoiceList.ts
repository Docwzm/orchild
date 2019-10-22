import { Component, Vue } from 'vue-property-decorator'
import { Toast } from 'vant'
import { UserService, MedicService } from '@/api'

import TextSearch from '@/components/TextSearch/TextSearch.vue'
// import wx from 'weixin-js-sdk'
const wx = require('weixin-js-sdk') // @ is an alias to /src

@Component({
    components: {
        TextSearch
    }
})
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
        // eslint-disable-next-line
        console.log("wx:",wx);
        // eslint-disable-next-line
        wx.miniProgram.postMessage({ data: 'test' })
        wx.miniProgram.navigateTo({ url: '/medicPackage/invoice/InvoiceEntry/index?hello=hi' })
        // this.$router.push('/addInvoice')
    }

    private searchInputHandle (val:string) {
        console.log('input:', val)
    }
}
