import { Component, Vue,Watch} from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import ListItem from '@/components/ListItem/ListItem.vue'
import { CategoryService } from '@/api'
@Component({
    components: { Cell, ListItem }
})
export default class CreditApplication extends Vue {
    @Watch('startTime')
    @Watch('endTime')
    onChildChanged(val: string, oldVal: string) { 
      if(this.startTime && this.endTime){
            this.dateObj.fromDate = this.startTime + " 00:00:00";
            this.dateObj.toDate = this.endTime +  " 00:00:00";
            this.inventoryList()
      }
    }
    businessNo:any=''
    placeholderText: any=''
    labelText:any='请选择产品'
    isPopShow: any = false
    isEndShow: any = false
    value: any = '' 
    startTime:any=''
    endTime:any=''
    loading = false
    finished = false
    showTimeMask = false
    NoLoanData = []
    dateObj:any={}
    fromDate:any=''
    toDate:any=''
    minDate:any=''
    changeDate:any=''
    businessData:any=''
    columnsData:any = [
        {id:101, text: '光谷金信' },
        {id:103, text: '熊文俊' }
    ]
    private onLoad () {
        if(this.columnsData.length > 0 ){
            this.businessData = this.columnsData[0].text
            this.businessNo = this.columnsData[0].id
        }
        this.onPeriodChange(1)  //默认显示本周业务
    }
    //时间区间切换
    private async onPeriodChange (evt :any) {
        if (evt == 1) {
            let week = this.$utils.getCurrentWeek();
            this.fromDate = week[0];
            this.toDate = week[1];
          } else if (evt == 2) {
            let month = this.$utils.getCurrentMonth();
            this.fromDate = month[0];
            this.toDate = month[1];
          } else if (evt == 3) {
            let year = this.$utils.getCurrentYear();
            this.fromDate = year[0];
            this.toDate = year[1];
          } else if (evt == 4) {
            this.fromDate = this.$utils.format(this.dateObj.fromDate, "yyyy/MM/dd");
            this.toDate = this.$utils.format(this.dateObj.toDate, "yyyy/MM/dd");
          }
          this.dateObj.fromDate = this.fromDate + " 00:00:00";
          this.dateObj.toDate = this.toDate + " 23:59:59";
          this.startTime = '';
          this.endTime = '';
          this.inventoryList(); //查询日期区间的订单列表
    }
    //监听picker选择器
    private async onChange (val: any) {
        this.businessData = val.text
        this.businessNo = val.id
        this.inventoryList()
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
    private async showStartPicker (picker:any) {
        this.isPopShow = true;
    }
    private async showEndPicker (picker:any) {
        this.isEndShow = true;
    }
    private async cancelPicker () {
        this.isPopShow = false;
    }
    private async startconfirmPicker (value:any) {
        this.isPopShow = false;
        let d = new Date(value)
        this.startTime = d.getFullYear() + '/' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1 ) + '/' + 
        (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) 
    }
    private async endconfirmPicker (value:any) {
        this.isEndShow = false;
        let d = new Date(value)
        this.endTime = d.getFullYear() + '/' + (d.getMonth() + 1 < 10 ? '0' +  (d.getMonth() + 1) : d.getMonth() + 1) + '/' + 
        (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) 
    }
}
