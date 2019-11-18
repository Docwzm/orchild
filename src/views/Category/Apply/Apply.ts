import { Component, Vue } from 'vue-property-decorator';
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import { CategoryService } from "@/api"

@Component({
    components: { JXCircle }
})
export default class Apply extends Vue {
    value = 0;
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    };

    warehouseName = ""//仓库名称
    pledgeType = ""//质押类型
    productName = ""//产品名称
    loanAmount = 0//待还金额
    goodsValue = 0//在库货值
    pledgeGoodsValue = 0//担保货值
    inventoryTime = ""//库存统计时间
    rate = 0//图表质押率
    options: any = {}

    get text() {
        return this.rate.toFixed(0) + '%'
    }

    mounted() {
        this.options = this.$route.query
        this.rate = this.options.rate
    }

    loan() {
        this.$router.push({ path: '/loan', query: this.options })
    }
    /**还款先判断是都有借据信息 */
    refound() {
        let that = this
        let params = {
            businessNo: this.options.businessNo,
            warehouseId: this.options.warehouseId,
            loanNo: ''
        }
        CategoryService.isLoanNo(params).then(res => {
            that.$router.push({ path: '/refound', query: this.options });
        })
    }

    /**监控设备 */
    monitorEvt() {
        let params = {
            businessNo: this.options.businessNo
        }
        this.$router.push({ path: '/monitorList', query: params })
    }
}
