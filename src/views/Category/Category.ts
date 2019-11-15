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
    result = 0 // -100-没有业务 1-有业务  else -审核中
    activeBizIndex = 0
    bizData: Array<any> = []
    fundDebtStatisticVO = {}
    fundMemberCredit = {}
    // 下拉参数
    columnsData: Array<any> = []
    organizationName = ""
    busNo = ""
    WarehousePledgeProfiledata = []
    productVoList = []
    //图表颜色
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    }


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


   

    created() {
        console.log(123);

        this.getDataInfo();
    }


    // 查看业务记录
    lookLog() {
        this.$router.push({ name: "businessList", query: { data: this.productVoList, busNo: this.busNo } });
    }
    onChange(e: any) {
        // this.organizationName = value.text;
        this.activeBizIndex = e.val;
        console.log("index",this.activeBizIndex);

        this.reviewCall(this.activeBizIndex);
        this.getDataInfo()
        // this.getDynamicData(this.bizData[this.activeBizIndex].businessNo);
    }

    apply() {
        this.$router.push("/apply")
    }
    //还款
    refound() {
        this.$router.push('/refound');
    }

    // 初始化信息
    async getDataInfo() {
        let currentOrg = this.$store.state.base.loginUserCurrentOrganization
        let obj_1 = {
            memberId: currentOrg.memberId,
            orgId: currentOrg.organizationId == undefined ? '' : currentOrg.organizationId
        };

        const creditData: any = await CategoryService.getCreditInfo(obj_1);
        const centerData = this.$store.state.base.personalCentreInfo;
        console.log("creditData", creditData);

        console.log("centerData", centerData);

        if (creditData.code === 200 && centerData) {
            let index = 0;

            if ((centerData.productVoList ? centerData.productVoList.length : 0) == 0) {
                this.result = -100;
            } else if(creditData.data[index].result){
                console.log("dataatata", creditData);

                this.result = creditData.data[index].result;

            } else {
                this.result = 3;
            }
            console.log("result", this.result);

            this.productVoList = centerData.productVoList ? centerData.productVoList : [];

            this.activeBizIndex = index;
            this.bizData = creditData.data;

            this.bizData.forEach((item, index) => {
                this.columnsData[index] = { text: item.financialProductName, val: index }
            })
            console.log("activeIndex",this.bizData[this.activeBizIndex]);
            if (this.bizData[this.activeBizIndex] && this.bizData[this.activeBizIndex].fundDebtStatisticVO) {
                this.fundDebtStatisticVO = this.bizData[this.activeBizIndex].fundDebtStatisticVO;
            }else {
                this.fundDebtStatisticVO = {oweQuota:'',minOweDate:''};
            }


            if (this.bizData[this.activeBizIndex] && this.bizData[this.activeBizIndex].fundMemberCredit) {
                this.fundMemberCredit = this.bizData[this.activeBizIndex].fundMemberCredit;
            }else {
                this.fundDebtStatisticVO = {remainQuota:'',creditQuota:''};
            }

            // this.fundDebtStatisticVO = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundDebtStatisticVO : {oweQuota:0};
            // this.fundMemberCredit = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundMemberCredit : {minOweDate:0};

            // this.getDynamicData(creditData.data[index]);

            // const wareHouse = await CategoryService.getWarehouseInfo(params);
            // console.log("~~~~",wareHouse);
            // this.WarehousePledgeProfiledata = wareHouse.data;


            this.getDynamicData(creditData.data[index].businessNo);

        }


    }

    //根据流水号获取仓库数据
    getDynamicData(num: string) {
        console.log("传递过来的",num);

        if (this.isMuchangdai) {
            return;
        }
        let params = {
            businessNo: num || "2019061800250009491",
            applierId: '500084',
            applierOrgId: 169,
        };
        CategoryService.getWarehouseInfo(params)
            .then(res => {
                if (!res.data) {
                    return;
                }
                this.WarehousePledgeProfiledata = res.data;
            })


    }

    // 审核时候下来的回调
    reviewCall (e:any) {
        console.log("回调的",e);
        this.activeBizIndex = e.val;
        this.organizationName = e.text

        console.log(this.bizData[this.activeBizIndex]);

        this.result = this.bizData[this.activeBizIndex].result ? this.bizData[this.activeBizIndex].result : 3;
        console.log(this.result);

        this.getDynamicData(this.bizData[this.activeBizIndex].businessNo);
    }

}
