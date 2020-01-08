import { Component, Vue, Prop } from 'vue-property-decorator'
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import { CategoryService } from "@/api"

@Component({
    components: {
        JXCircle
    }
})
export default class Loan extends Vue {
    show = false;
    dateShow = false;
    showPicker = false
    value = "";
    currentDate = new Date();
    maxDate = new Date(2100, 12, 31)

    money = ""//实时输入的金额
    repayDate = ""

    options: any = {}
    showloaninfo: any = {}

    mounted() {
        this.options = this.$route.query
        this.loanInfoShow()
    }

    /**时间选择 */
    onSelectTime(value: any) {
        this.showPicker = false
        let rdate = this.$utils.formatDate(value);
        var date1 = new Date(this.showloaninfo.creditEndDay);
        var date2 = new Date(rdate);
        if (date2 > date1) {
            this.$toast('选择日期时间不能大于可用期限!');
            return;
        }
        this.repayDate = rdate
    }

    /**取消 */
    onCancell() {
        this.showPicker = false
    }

    /**申请借款 */
    loadApply() {
        let that = this
        if (this.money > this.showloaninfo.remainQuota) {
            this.$toast('借款金额不能大于可用额度!');
            return;
        }
        if (this.money == '') {
            this.$toast('请输入借款金额');
            return;
        } else if (this.repayDate == '') {
            this.$toast('请选择日期');
            return;
        }
        var date1 = new Date(this.showloaninfo.creditEndDay);
        var date2 = new Date(this.repayDate);
        if (date2 > date1) {
            this.$toast('选择日期时间不能大于可用期限!');
            return;
        }
        this.$toast.loading({
            duration: 0,
            forbidClick: true,
            // mask: true,
            message: "加载中..."
        })
        let currentInfo = this.$store.state.base.loginUserCurrentOrganization
        let params = {
            'applierId': currentInfo.memberId,//申请人
            'applierOrgId': currentInfo.organizationId,//申请人orgid
            'applyAmount': this.money,//申请借款金额
            'applyLoanDeadline': this.repayDate+ ' ' + '00:00:00',//申请借款截止日期
            'businessNo': this.options.businessNo,//业务单号
            'warehouseId': this.options.warehouseId,//仓库id
            'warehouseName': this.options.warehouseName,//仓库
            'warehouseAddress': this.options.warehouseAddress,//仓库地址
            'warehousePledgeType': this.options.warehousePledgeType,//仓库质押类型(1-静态质押,2-动态质押)
            'productId': this.options.productId,//产品ID
            'productName': this.options.productName//产品名称
        }
        CategoryService.loadApply(params).then((res: any) => {
            that.$toast.clear()
            that.$router.push({
                name: "result", params: {
                    typeName: "checked",//1,操作成功 checked 2 操作失败 warning"
                    content: res.msg//操作成功可不填,操作失败需要传入msg
                }
            })
        }).catch(err => {
            that.$toast.clear()
            that.$router.push({
                name: "result", params: {
                    typeName: "warning",//1,操作成功 checked 2 操作失败 warning"
                    content: err.msg//操作成功可不填,操作失败需要传入msg
                }
            })
        })
    }

    loanInfoShow() {
        let params = {
            'businessNo': this.options.businessNo,//业务单号
            'warehouseId': this.options.warehouseId,//仓库id
        }
        CategoryService.loanInfoShow(params).then(res => {
            this.showloaninfo = res.data;
        })
    }
}