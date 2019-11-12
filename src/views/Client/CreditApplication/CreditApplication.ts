import { Component, Vue } from 'vue-property-decorator'
import { HomeService } from '@/api'

@Component({
    components: {}
})
export default class CreditApplication extends Vue {
    creditMoney: any = ''// 期望额度
    radioStatus = true
    innerWh = 0
    startText = 0
    endText = 100
    options: any = {}
    mounted() {
        this.options = this.$route.params;
        this.startText = this.$utils.moneyNormalize(this.options.quotaStart)
        this.endText = this.$utils.moneyNormalize(this.options.quotaEnd)
    }
    chooseEnclosure() {
        this.$router.push('/Enclosure')
    }
    checkClick(event: Event) {
        if (this.radioStatus) {
            this.radioStatus = false
        } else {
            this.radioStatus = true
        }
        console.log(this.radioStatus)
    }
    changeValueEvt(event: Event) {
        if (this.creditMoney > this.options.quotaEnd) {
            this.$toast('申请需要在授信金额范围内')
            return
        }
        const initNum = this.creditMoney / this.options.quotaEnd
        this.innerWh = this.$utils.moneyNormalize(initNum) * 100
        console.log(this.innerWh)
        // this.creditMoney = this.$utils.moneyNormalize(this.creditMoney)
    }
    /**
     * 获取当前申请信息 流水号
     */
    async getApplyInfo() {
        let params = {}
        let { data } = await HomeService.getApplyInfo(params)
    }

    /**
     * 立即申请
     */
    async applyEvt() {
        if (!this.radioStatus) {
            this.$toast('请勾选同意申请协议')
            return
        }
        let params = {}
        let { data } = await HomeService.applyFinancing(params)
    }
}
