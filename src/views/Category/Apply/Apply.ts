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
    rate = 70//图表质押率

    get text() {
        return this.rate.toFixed(0) + '%'
    }

    loan() {
        this.$router.push('/loan')
    }
    /**还款先判断是都有借据信息 */
    refound() {
        let that = this
        let params = {
            businessNo: "",
            warehouseId: "",
            loanNo: ''
        }
        CategoryService.isLoanNo(params).then(res => {
            that.$router.push('/refound');
        })
    }

    /**监控设备 */
    monitorEvt() {
        this.$router.push('/monitorList')
    }
}
