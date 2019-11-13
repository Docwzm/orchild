import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import ListItem from '@/components/ListItem/ListItem.vue'
import { CategoryService } from '@/api'
@Component({
    components: { Cell, ListItem }
})
export default class CreditApplication extends Vue {
    placeholderText: any=''
    labelText:any='请选择产品'
    isPopShow: any = false
    value: any = '' 
    currentTime: any
    startTime:any
    endTime:any
    datePicker:any = false
    loading = false
    finished = false
    showTimeMask = false
    NoLoanData = []
    dateObj:any={}
    fromDate:any=''
    toDate:any=''
    minDate:any=''
    changeDate:any=''
    private onLoad () {
        // this.currentTime = new Date(), // 开始时间不能超过当前时间
        // this.startTime = new Date(), // 开始时间
        // this.endTime = new Date(), // 结束时间
        this.onPeriodChange(1)  //默认显示本周业务
    }
    //时间区间切换
    onPeriodChange(evt :any) {
        if (evt == 1) {
          var week = this.$utils.getCurrentWeek();
          this.fromDate = week[0];
          this.toDate = week[1];
        } else if (evt == 2) {
          var month = this.$utils.getCurrentMonth();
          this.fromDate = month[0];
          this.toDate = month[1];
        } else if (evt == 3) {
          var year = this.$utils.getCurrentYear();
          this.fromDate = year[0];
          this.toDate = year[1];
        } else if (evt == 4) {
          this.fromDate = this.$utils.format(this.dateObj.fromDate, "yyyy/MM/dd");
          this.toDate = this.$utils.format(this.dateObj.toDate, "yyyy/MM/dd");
        }
        this.dateObj.fromDate = this.fromDate + " 00:00:00";
        this.dateObj.toDate = this.toDate + " 23:59:59";
        this.inventoryList(); //查询日期区间的订单列表
    }
    //业务记录列表
    private async inventoryList () {
        let params = {
            businessNo: '201904170289637626',
            fromDate: this.dateObj.fromDate,
            toDate: this.dateObj.toDate,
        }
        const result  = await CategoryService.businessList(params)
        this.NoLoanData = result.data
    }
    private async timePicker () {
        this.showTimeMask = !this.showTimeMask
    }
    private async closeMask () {
        this.showTimeMask = !this.showTimeMask
    }

    private async showDatePicker (picker:any) {
        this.isPopShow = true;
        this.datePicker = picker;
    }
    private async cancelPicker () {
        this.isPopShow = false;
        this.datePicker = "";
    }
    private async confirmPicker (value:any) {
        // var date = value;
        // var m = date.getMonth() + 1;
        // var d = date.getDate();
        // if (m >= 1 && m <= 9) {
        //     m = "0" + m;
        // }
        // if (d >= 0 && d <= 9) {
        //     d = "0" + d;
        // }
        // var timer = date.getFullYear() + "-" + m + "-" + d
        // this.$refs[this.datePicker].innerHTML = timer;
        this.isPopShow = false;
        this.datePicker = "";
    }
    private async formatter (type:any, value:any) {
        // if (type === "year") {
        //     return `${value}年`;
        // } else if (type === "month") {
        //     return `${value}月`;
        // }
        // return value;
    }
}
