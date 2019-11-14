import { Component, Vue } from 'vue-property-decorator';
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import Cell from '@/components/Cell/Cell';
import { CategoryService } from "@/api";


interface IDropData {
    text: string,
    value: number
}

@Component({
    components: { JXCircle, Cell }
})
export default class Category extends Vue {
    productName = ''
    result = 0;  // -100-没有业务 1-有业务 2-审核中
    activeBizIndex = 0
    bizData: Array<any> = []
    fundDebtStatisticVO = {}
    fundMemberCredit = {}
    columnsData: Array<any> = []
    busNo = ""
    WarehousePledgeProfiledata = []
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
        this.getDataInfo();
    }


    lookLog() {
        this.$router.push({ name: "businessList", params: { name: this.productName, busNo: this.busNo } });
    }
    onChange(value: any) {
        console.log(event);

            this.productName = value.text;

        // alert(this.valueText);
        this.activeBizIndex = value.val;
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
            memberId: '500084',
            orgId: currentOrg.organizationId == undefined ? '' : currentOrg.organizationId
        };

        const data_1: any = await CategoryService.getCreditInfo(obj_1);
        const data_2 = this.$store.state.base.personalCentreInfo;
        console.log("data_1", data_1);

        console.log("data_2", data_2);

        if (data_1.code === 200 && data_2) {
            let index = 0;

            if ((data_2.productVoList ? data_2.productVoList.length : 0) == 0) {
                this.result = -100;
            } else {
                this.result = data_1.data[index].result;

            }
            console.log("result",this.result);

            this.activeBizIndex = index;
            this.bizData = data_1.data;


            this.bizData.forEach ((item,index)=>{
                this.columnsData[index] = {text:item.financialProductName,val:index}
            })
            this.fundDebtStatisticVO = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundDebtStatisticVO : {};
            this.fundMemberCredit = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundMemberCredit : {};

            // this.getDynamicData(data_1.data[index]);

            // const wareHouse = await CategoryService.getWarehouseInfo(params);
            // console.log("~~~~",wareHouse);
            // this.WarehousePledgeProfiledata = wareHouse.data;


            this.getDynamicData(data_1.data[index].businessNo);

        }


    }

    //根据流水号获取仓库数据
    async getDynamicData(num:string) {
        if (this.isMuchangdai) {
            return;
        }
            let params = {
                businessNo: num || "2019061800250009491",
                applierId: '500084',
                applierOrgId: 169,
            };
            await CategoryService.getWarehouseInfo(params)
            .then(res=>{
               if (!res.data) {
                   return;
               }
                this.WarehousePledgeProfiledata = res.data;


            })


    }


}
