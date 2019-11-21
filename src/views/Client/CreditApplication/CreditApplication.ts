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
    created() {
        this.options = this.$store.state.base.pageParams;
        this.startText = this.$utils.moneyNormalize(this.options.quotaStart)
        this.endText = this.$utils.moneyNormalize(this.options.quotaEnd)
    }
    chooseEnclosure() {
        this.$router.push({ path: '/Enclosure', query: { productId: this.options.id } })
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
    applyEvt() {
        let that = this;
        let currentOrg = this.$store.state.base.loginUserCurrentOrganization
        if (!this.radioStatus) {
            this.$toast('请勾选同意申请协议')
            return
        }
        this.$toast.loading({
            duration: 0,
            forbidClick: true,
            // mask: true,
            message: "加载中..."
        })
        let params = {
            "productId": this.options.id,
            "orgId": currentOrg.organizationId == undefined ? '' : currentOrg.organizationId,
            "memberId": currentOrg.memberId,
            "memberName": currentOrg.memberName,
            "productName": this.options.name,
            "businessNo": this.options.businessNo,
            "creditQuota": this.creditMoney
        }

        HomeService.applyFinancing(params).then(res => {
            that.$toast.clear()
            let _res: any = res;
            that.$router.push({
                name: 'result',
                params: {
                    typeName: "checked",//1,操作成功 checked 2 操作失败 warning"
                    content: ""//操作成功可不填,操作失败需要传入msg
                }
            })
        }).catch(error => {
            that.$toast.clear()
            that.$router.push({
                name: 'result',
                params: {
                    typeName: "warning",//1,操作成功 checked 2 操作失败 warning"
                    content: error.message//操作成功可不填,操作失败需要传入msg
                }
            })
        })
    }
}
