import { Component, Vue } from 'vue-property-decorator'
import { HomeService } from '@/api'

@Component({
    components: {}
})
export default class CreditApplication extends Vue {
    creditMoney: any = ''// 期望额度
    radioStatus = true
    innerWh = 0
    startText = 100000
    endText = 500000
    mounted () {
        this.startText = this.$utils.moneyNormalize(this.startText)
        this.endText = this.$utils.moneyNormalize(this.endText)
    }
    chooseEnclosure () {
        this.$router.push('/Enclosure')
    }
    changeValueEvt (event: Event) {
        if (this.creditMoney > 500000) {
            this.$toast('申请需要在授信金额范围内')
            return
        }
        const initNum = this.creditMoney / 500000
        this.innerWh = this.$utils.moneyNormalize(initNum) * 100
        console.log(this.innerWh)
        // this.creditMoney = this.$utils.moneyNormalize(this.creditMoney)
    }
    /**
     * 获取当前申请信息 流水号
     */
    async getApplyInfo () {
        let params = {}
        let { data } = await HomeService.getApplyInfo(params)
    }

    /**
     * 立即申请
     */
    async applyEvt () {
        let params = {}
        let { data } = await HomeService.applyFinancing(params)
    }
}
