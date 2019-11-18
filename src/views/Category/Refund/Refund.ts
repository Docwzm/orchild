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
    principal: any = ''  //本金



    created() {
        this.getFirstLoanData();
    }

    // 初始化页面获取借据信息
    getFirstLoanData() {
        let params = {
            businessNo: '2019061800150009413',
            warehouseId: '44',
            loanNo: ''
        }
        CategoryService.isLoanNo(params)
        .then((res: any) =>{
            if (res.code===200) {
                console.log("获取默认的借据相关信息")
                this.FirstLoanData=res.data
                this.principal=this.FirstLoanData.loanBalance;
            } else {
                console.log("获取默认的借据相关信息:"+res.msg)

            }

        })
    }
}
