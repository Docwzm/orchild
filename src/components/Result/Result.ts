import { Component, Vue, Prop,Watch, PropSync  } from 'vue-property-decorator';
import Cell from '@/components/Cell/Cell';


@Component({
    components: {
        Cell
    }
})
export default class Result extends Vue {
    @PropSync('bizData')  newBizData!:Array<any>;
    @Prop() activeBizIndex: any

    userMoney: any = 0
    totalMoney: any = 0;
    columnsData:any = []
    organizationName:any = ''

    created() {
        this.getData();
    }

    onChangeHandle(e: any) {
        this.$emit('onChange',e)
    }
    // @Watch('bizData',{immediate: true})
    // onBizData(val: any, oldVal: string) {

    //     this.newBizData = val;
    //     this.getData();

    // }

    getData() {
        if (this.newBizData[this.activeBizIndex] && this.newBizData[this.activeBizIndex].fundMemberCredit) {
            this.userMoney = this.newBizData[this.activeBizIndex].fundMemberCredit.remainQuota || 0;
            this.totalMoney = this.newBizData[this.activeBizIndex].fundMemberCredit.creditQuota || 0;
        }
        this.newBizData.forEach((item:any, index:any) => {
            this.columnsData[index] = { text: item.financialProductName, val: index }
        })
        if (this.columnsData.length) {
            console.log(this.columnsData);
            this.organizationName = this.columnsData[0].text;
            console.log(this.organizationName);

        }
    }


}