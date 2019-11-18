import { Component, Vue, Watch } from 'vue-property-decorator'
import JXCircle from '@/components/JXCircle/JXCircle.vue'
import Cell from '@/components/Cell/Cell.vue'
import NoData from '@/components/NoData/NoData.vue' //没有业务
import Result from '@/components/Result/Result.vue'
import { CategoryService } from "@/api"


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
        this.$store.commit("setProductActiveIndex", 0)
        // console.log("loginUserCurrentOrganization:" + newval);
    }
    created() {
        this.organizationName = null;
        this.activeBizIndex = this.$store.state.base.productActiveIndex
        this.getDataInfo();
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
    refund() {
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
        this.$router.push({ path: "/businessList", query: { data: this.productVoList, businessNo: this.bizData[this.activeBizIndex].businessNo } });
    }

    // 初始化信息
    async getDataInfo() {
        this.currentOrg = this.$store.state.base.loginUserCurrentOrganization
        let obj_1 = {
            memberId: this.currentOrg.memberId,
            orgId: this.currentOrg.organizationId == undefined ? '' : this.currentOrg.organizationId
        };
        const creditData: any = await CategoryService.getCreditInfo(obj_1);
        const centerData = this.$store.state.base.personalCentreInfo;
        if (creditData.code === 200 && centerData) {
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

            // this.fundDebtStatisticVO = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundDebtStatisticVO : {oweQuota:0};
            // this.fundMemberCredit = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundMemberCredit : {minOweDate:0};

            // this.getDynamicData(creditData.data[index]);

            // const wareHouse = await CategoryService.getWarehouseInfo(params);
            // console.log("~~~~",wareHouse);
            // this.WarehousePledgeProfiledata = wareHouse.data;


            //

        }


    }

    /**
     * 根据流水号获取仓库数据
     * @param num
     */
    getDynamicData(num: string) {
        console.log("传递过来的", num);

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
                return;
            }
            this.WarehousePledgeProfiledata = res.data;
        })
    }

    // 审核时候下来的回调
    reviewCall(e: any) {
        console.log("回调的", e);
        this.$store.commit("setProductActiveIndex", e.val)
        this.activeBizIndex = e.val;
        this.organizationName = e.text
        this.$store.commit("setBusinessActiveIndex", this.bizData[this.activeBizIndex].result ? this.bizData[this.activeBizIndex].result : 3)
        this.getDynamicData(this.bizData[this.activeBizIndex].businessNo);
    }

}
