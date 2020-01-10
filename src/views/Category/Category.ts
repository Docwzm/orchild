import { Component, Vue, Watch } from 'vue-property-decorator'
import JXCircle from '@/components/JXCircle/JXCircle.vue'
import Cell from '@/components/Cell/Cell.vue'
import NoData from '@/components/NoData/NoData.vue' //没有业务
import Result from '@/components/Result/Result.vue'
import { CategoryService } from "@/api"
import { RanchService } from "@/api"

// 下拉数据格式约束
interface IDropData {
    text: string,
    value: number
}

@Component({
    components: { Cell, JXCircle, NoData, Result }
})
export default class Category extends Vue {
    result: any = '' // -100-没有业务 1-有业务  else -审核中
    activeBizIndex = 0
    bizData: Array<any> = []
    fundDebtStatisticVO = {}
    fundMemberCredit = {}
    // 下拉参数
    columnsData: Array<any> = []
    organizationName: any = ""
    busNo = ""
    WarehousePledgeProfiledata = []
    productVoList = []
    //图表颜色
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    }
    currentOrg: any = null
    status = 0 //判断授信有无被拒绝 0 拒绝   1 正常
    loading = true
    ranchLs =[]  //牧场列表
    get text() {
        return this.creditUseRatePercent.toFixed(0) + '%'
    }

    get isMuchangdai() {
        if (this.bizData.length > 0) {
            return this.bizData[this.activeBizIndex].financialProductId == 10;
        }
    }

    get isYixiedai() {
        if (this.bizData.length > 0) {
            return this.bizData[this.activeBizIndex].financialProductId == 49;
        }
    }

    get creditUseRatePercent() {
        if (this.bizData.length > 0) {
            return this.bizData[this.activeBizIndex].creditUseRate;
        }
        return 0;
    }


    @Watch("$store.state.base.loginUserCurrentOrganization", { immediate: true })
    onCurrentOrg(newval: any, oldval: any) {
        if (this.$store.state.base.pageParams.orgName == undefined ||
            this.$store.state.base.pageParams.orgName != newval.organizationName) {
            this.$store.commit("setProductActiveIndex", 0)
        }
    }
    created() {
        this.organizationName = null;
        this.currentOrg = this.$store.state.base.loginUserCurrentOrganization
        this.activeBizIndex = this.$store.state.base.productActiveIndex
        this.getDataInfo();
        // if(this.bizData[this.activeBizIndex].financialProductId == 10){
            this.getRanchList()
        // }
    }

    onChange(e: any) {
        this.organizationName = e.text;
        this.$store.commit("setProductActiveIndex", e.val)
        this.activeBizIndex = e.val;
        this.getDataInfo()
    }

    apply(item: any) {
        let reansfer: any = {
            businessNo: this.bizData[this.activeBizIndex].businessNo,
            productId: this.bizData[this.activeBizIndex].financialProductId,
            productName: this.bizData[this.activeBizIndex].financialProductName,
            ...item
        }
        this.$router.push({
            path: "/apply", query: reansfer
        })
    }
    //还款
    refound() {
        let that = this
        let params = {
            businessNo: this.bizData[this.activeBizIndex].businessNo,
            warehouseId: '',
            loanNo: ''
        }
        CategoryService.isLoanNo(params).then(res => {
            that.$router.push({
                path: '/refund', query: {
                    businessNo: this.bizData[this.activeBizIndex].businessNo,
                    warehouseId: '',//仓库id
                    warehouseName: '',//仓库名称
                    warehouseAddress: '',//仓库地址
                    warehousePledgeType: '',//仓库类型
                    productId: '',//产品ID
                    productName: ''//产品名称
                }
            });
        })
    }
    /**
     * 
     * @param items 查看库存
     */
    goInventory(items: any) {
        let params = {
            productId: this.bizData[this.activeBizIndex].financialProductId,
            ...items
        }
        this.$router.push({ path: "/productList", query: params })
    }

    /**
     * 查看业务记录
     */
    lookLog() {
        this.$router.push({ path: "/businessList", query: { data: this.productVoList } });
    }

    // 初始化信息
    async getDataInfo() {
        let obj_1 = {
            memberId: this.currentOrg.memberId,
            orgId: this.currentOrg.organizationId == undefined ? '' : this.currentOrg.organizationId
        };
        const creditData: any = await CategoryService.getCreditInfo(obj_1);
        const centerData = this.$store.state.base.personalCentreInfo;
        if (creditData.code === 200 && centerData && creditData.data.length > 0) {

            let index = 0
            this.bizData = creditData.data

            this.organizationName = creditData.data[this.activeBizIndex].financialProductName
            if ((centerData.productVoList ? centerData.productVoList.length : 0) == 0) {
                this.$store.commit("setBusinessActiveIndex", -100)
                this.result = -100
            } else if (creditData.data[this.activeBizIndex].result) {
                this.$store.commit("setBusinessActiveIndex", creditData.data[this.activeBizIndex].result)
                this.result = creditData.data[this.activeBizIndex].result
            } else {
                this.$store.commit("setBusinessActiveIndex", 3)
                this.result = 3
            }
            this.status = centerData.defaultProductVo ? centerData.defaultProductVo.status : 0; //判断授信状态
            this.productVoList = centerData.productVoList ? centerData.productVoList : [];
            this.activeBizIndex = this.$store.state.base.productActiveIndex;
            this.bizData.forEach((item, index) => {
                this.columnsData[index] = { text: item.financialProductName, val: index }
            })
            if (this.bizData[this.activeBizIndex] && this.bizData[this.activeBizIndex].fundDebtStatisticVO) {
                this.fundDebtStatisticVO = this.bizData[this.activeBizIndex].fundDebtStatisticVO;
            } else {
                this.fundDebtStatisticVO = { oweQuota: '', minOweDate: '' };
            }
            if (this.bizData[this.activeBizIndex] && this.bizData[this.activeBizIndex].fundMemberCredit) {
                this.fundMemberCredit = this.bizData[this.activeBizIndex].fundMemberCredit;
            } else {
                this.fundDebtStatisticVO = { remainQuota: '', creditQuota: '' };
            }
            this.getDynamicData(creditData.data[this.activeBizIndex].businessNo);
            this.$store.commit("changeState", { key: "pageParams", orgName: this.currentOrg.organizationName })
            this.loading = false
        } else if (creditData.data.length <= 0) {
            this.$store.commit("setBusinessActiveIndex", -100)
            this.result = -100
            this.loading = false
        }


    }

    /**
     * 根据流水号获取仓库数据
     * @param num
     */
    getDynamicData(num: string) {
        let that = this
        if (this.isMuchangdai) {
            return;
        }
        let params = {
            businessNo: num,
            applierId: this.currentOrg.memberId,
            applierOrgId: this.currentOrg.organizationId == undefined ? 0 : this.currentOrg.organizationId,
        };
        CategoryService.getWarehouseInfo(params).then(res => {
            if (!res.data) {
                that.loading = false
                return;
            }
            that.WarehousePledgeProfiledata = res.data;
            that.loading = false
        }).catch(error => {
            that.loading = false
        })
    }
    /**
     * 刷新牧场列表
     */
    async getRanchList(){
        if( this.currentOrg.organizationId){
            var memberId =  this.currentOrg.organizationId
            var memberType = 2  //1-个人 2-企业
        }else {
            var memberId =  this.currentOrg.memberId
            var memberType = 1  // 1-个人 2-企业
        }
        let params = {
            memberId,
            memberType,
        }
        const {data} = await RanchService.loadRanchList(params)
        this.ranchLs =  data
    }

    gotoRanch(item:any){
        this.$router.push({ 
            path: "/ranchDetail", 
            query: {   
                businessNo:  this.bizData[this.activeBizIndex].businessNo,//业务单号
                productId:   this.bizData[this.activeBizIndex].financialProductId,//产品ID
                productName: this.bizData[this.activeBizIndex].financialProductName,//产品名称
                name:item.name,
                id:item.id
            }
        })
    }

}
