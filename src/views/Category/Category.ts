import { Component, Vue } from 'vue-property-decorator';
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import Cell from '@/components/Cell/Cell';
import { CategoryService } from "@/api";


interface IDropData {
    text: string,
    value: string
}

@Component({
    components: { JXCircle, Cell }
})
export default class Category extends Vue {
    textValue = '';
    result = 0;  // -100-没有业务 1-有业务 2-审核中
    activeBizIndex = 0;
    bizData: Array<any> = [];
    fundDebtStatisticVO = {};
    fundMemberCredit = {};
    dropData: Array<IDropData> = [];
    busNo = "";
    WarehousePledgeProfiledata = [];
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    };


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
        this.$router.push({ name: "businessList", params: { name: this.textValue, busNo: this.busNo } });
    }
    onChange(event: any) {
        console.log(event);
        this.textValue = event.text;
        this.busNo = event.value;
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
        let obj_1 = {
            memberId: '500157',
            orgId: '105219'
        };

        const data_1: any = await CategoryService.getCreditInfo(obj_1);
        const data_2 = this.$store.state.base.personalCentreInfo;
        console.log("data_1", data_1);

        console.log("data_2", data_2);

        if (data_1.code === 200) {
            let index = 0;

            if ((data_2.productVoList ? data_2.productVoList.length : 0) == 0) {
                this.result = -100;
            } else {
                this.result = data_1.data[index].result;

            }
            this.activeBizIndex = index;
            this.bizData = data_1.data;
            this.dropData = this.bizData.map((item, index) => {
                return { text: item.financialProductName, value: item.businessNo }
            });

            this.fundDebtStatisticVO = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundDebtStatisticVO : {};
            this.fundMemberCredit = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundMemberCredit : {};

            // this.getDynamicData(data_1.data[index]);
            let params = {
                businessNo: '2019061800150009413',
                applierId: '500084',
                applierOrgId: 169,
            };
            const wareHouse = await CategoryService.getWarehouseInfo(params);
            console.log("~~~~",wareHouse);
            this.WarehousePledgeProfiledata = wareHouse.data;

        }


    }

    //根据流水号获取仓库数据
    getDynamicData(data: any) {
        // if (this.isMuchangdai) {
        //     return;
        // }
        // if (data && data.businessNo) {
            let params = {
                businessNo: '2019061800150009413',
                applierId: '500084',
                applierOrgId: 169,
            };
            const res: any = CategoryService.getWarehouseInfo(params);
            console.log(res);

        // }

    }


}
