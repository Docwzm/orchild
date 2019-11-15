import { Component, Vue, Prop,Watch  } from 'vue-property-decorator';
import Cell from '@/components/Cell/Cell';


@Component({
    components: {
        Cell
    }
})
export default class Result extends Vue {
    @Prop()  bizData: any
    @Prop() activeBizIndex: any

    userMoney: any = 0
    totalMoney: any = 0;
    newBizData: any = [];

    @Watch('bizData',{immediate: true})
    onBizData(val: string, oldVal: string) {
        this.newBizData = val;

        if (val[this.activeBizIndex] && val[this.activeBizIndex].fundMemberCredit && val[this.activeBizIndex].fundMemberCredit.creditQuota) {
            this.userMoney = val[this.activeBizIndex].fundMemberCredit.creditQuota;
        }



    }
}