import { Component, Vue } from 'vue-property-decorator';
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import Cell from '@/components/Cell/Cell';
import {CategoryService} from "@/api";


@Component({
    components: { JXCircle, Cell }
})
export default class Category extends Vue {
    value = 0;
    result = 0;  // -100-没有业务 1-有业务 2-审核中
    activeBizIndex = 0;
    bizData: Array<any> = [];
    fundDebtStatisticVO = {};
    fundMemberCredit = {};
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    };
    columns = [
        { text: '全部商品士大夫撒地方', value: 0 },
        { text: '新款商品撒打发斯蒂芬', value: 1 },
        { text: '活动商品撒的发生的', value: 2 }
    ]

    get text() {
        return this.creditUseRatePercent.toFixed(0) + '%'
    }

    get isMuchangdai(){
        if(this.bizData.length > 0){
           return this.bizData[this.activeBizIndex].financialProductId == 10;
        }
    }

    get isYixiedai(){
        if(this.bizData.length > 0){
          return this.bizData[this.activeBizIndex].financialProductId == 49;
        }
      }

    get creditUseRatePercent(){
        if(this.bizData.length > 0){
          return this.bizData[this.activeBizIndex].creditUseRate;
        }
        return 0;
    }

    created() {
        this.getDataInfo();

    }


    lookLog() {
        this.$router.push({ name: "BusinessList" });
    }
    onChange(picker: any, value: any, index: any) {
        alert(123);
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
            memberId : '500157',
            orgId: '105219'
        };

       const data_1: any =  await CategoryService.getCreditInfo(obj_1);
       const data_2 = this.$store.state.base.personalCentreInfo;
       console.log("data_1",data_1);

        console.log("data_2",data_2);

       if (data_1.code === 200) {
            let index = 0;

        if ((data_2.productVoList ? data_2.productVoList.length : 0) == 0) {
            this.result = -100;
        } else {
            this.result = data_1.data[index].result;

        }
        this.activeBizIndex = index;
        this.bizData = data_1.data;
        console.log(this.activeBizIndex,);
        this.fundDebtStatisticVO = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundDebtStatisticVO : {};
        this.fundMemberCredit = this.bizData[this.activeBizIndex] ? this.bizData[this.activeBizIndex].fundMemberCredit : {};
        }
    }

}
