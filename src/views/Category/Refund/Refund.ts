import { Component, Vue, Prop } from 'vue-property-decorator'
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import { CategoryService } from "@/api"


@Component({
    components: {
        JXCircle
    }
})
export default class Refund extends Vue {
    show = false;
    dateShow = false;
    value = "";
    currentDate = "";
    FirstLoanData: any = {}  //借据信息
    principal: any = 0  //本金
    tryprinc: any = ''
    queryParams: any = {};
    isCommitted: boolean = false; //防重复提交



    created() {
        this.queryParams = this.$route.query;
        this.getFirstLoanData();
        console.log(this.$store.state.base.loanNo);


    }

    //全部还清
    fullRepayment() {
        let pValue = this.FirstLoanData.loanBalance;
        this.tryprinc = this.FirstLoanData.loanBalance;
        this.principal = this.FirstLoanData.loanBalance;
    }

    //提交还款申请
    refundMoneySubmit() {
        if (this.principal < 0 || this.principal == 0) {
            this.$toast('请输入正确金额!');
            return;
        }

        if (this.principal > this.FirstLoanData.loanBalance) {
            this.$toast("还款本金不能大于待还本金!")
            return;
        }

        this.$toast.loading({
            duration: 0,
            forbidClick: true,
            message: "加载中..."
        })

        let data = {
            applierId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            applierName: this.$store.state.base.loginUserCurrentOrganization.memberName,
            applierOrgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
            applierOrgName: '',
            applyBaseAmount: this.principal,
            businessNo: this.queryParams.businessNo,
            debtNo: this.$store.state.base.loanNo === '' ? this.queryParams.loanNo : this.$store.state.base.loanNo,
            warehouseId: this.queryParams.warehouseId,
            warehouseName: this.queryParams.warehouseName,
            warehouseAddress: this.queryParams.warehouseAddress,
            warehousePledgeType: this.queryParams.warehousePledgeType,
            productId: this.queryParams.productId,
            productName: this.queryParams.productName,
            receiptNo: this.queryParams.loanNo

        }
        console.log(data);

        CategoryService.earlyRepay(data).then((res: any) => {
            this.$toast.clear();
            this.$router.push({
                name: 'result',
                params: {
                    typeName: "checked",//1,操作成功 checked 2 操作失败 warning"
                    content: ""//操作成功可不填,操作失败需要传入msg
                }
            })
        }).catch(error => {
            this.$toast.clear();
            this.$router.push({
                name: "result",
                params: {
                    typeName: "warning",
                    content: error.msg
                }
            })
        })


    }

    // 切换借据
    switchIou() {
        this.$router.push({ path: '/loanList', query: { businessNo: this.queryParams.businessNo, warehouseId: this.queryParams.warehouseId, receiptNo: this.queryParams.loanNo } })
    }

    // 初始化页面获取借据信息
    getFirstLoanData() {
        let params = {
            businessNo: this.queryParams.businessNo,
            warehouseId: this.queryParams.warehouseId,
            loanNo: ''
        }
        CategoryService.isLoanNo(params)
            .then((res: any) => {
                if (res.code === 200) {
                    console.log("获取默认的借据相关信息")
                    this.FirstLoanData = res.data
                    this.queryParams.loanNo = this.FirstLoanData.loanNo;
                    // this.principal = this.FirstLoanData.loanBalance;
                } else {
                    console.log("获取默认的借据相关信息:" + res.msg)

                }

            })
    }
}
