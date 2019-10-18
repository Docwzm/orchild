import { Component, Vue } from 'vue-property-decorator'
import { Toast } from 'vant'
import { UserService, MedicService } from '@/api'
import store from '@/store'

@Component({})
export default class InvoiceList extends Vue {
    // username: string = 'hx12345'
    // password: string = 'a123456'

    list = []
    loading = false
    finished = false
    showPicker = false
    // columns = ['杭州', '宁波', '温州', '嘉兴', '湖州']
    invoiceData = {
        invoiceNumber: '',
        invoiceCode: '',
        invoiceDate: '',
        amountInFiguers: '',
        purchaserName: '',
        purchaserRegisterNum: '',
        sellerName: '',
        sellerRegisterNum: ''
    }
    columns = ['杭州', '宁波', '温州', '嘉兴', '湖州']

    private created () {

    }

    private onLoad () {

    }

    // 计算发票类型
    private get invoiceTypesComputed () {
        return store.getters.getDictionaryListByType('invoice_type')
    }

    // private onConfirm(value) {
    //     this.value = value;
    //     this.showPicker = false;
    // }

    private async saveInvoice () {
        // var date = this.billDate.replace(/[^\d]/g, '/')
        console.log('invoiceData:', this.invoiceData)

        // 必填字段校验
        if (this.invoiceData.invoiceNumber && this.invoiceData.invoiceCode &&
            this.invoiceData.invoiceDate && this.invoiceData.amountInFiguers && this.invoiceData.purchaserName &&
            this.invoiceData.purchaserRegisterNum && this.invoiceData.sellerName &&
            this.invoiceData.sellerRegisterNum) {
            const { data } = await MedicService.createInvoice(this.invoiceData)
            Toast.success('发票新增成功')
        } else {
            Toast('请先完善必填字段信息,再保存')
        }
    }
}
