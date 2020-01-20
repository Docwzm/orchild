import {Vue,Component} from 'vue-property-decorator'
import {RanchService} from '@/api'
import FieldPicker from '@/components/FieldPicker/FieldPicker.vue'
@Component({
  components: {FieldPicker}
})
export default class CattleList extends Vue {
    status:any= ''
    ranchId:any=''
    placeholderText: any = '';
    labelText: any = '请选择条件';
    list = []
    columns: Array<any> = ['全部', '按月龄正序排列', '按月龄倒序排列', '按体重正序排列', '按体重倒序排列']
    showPicker: any = false
    finished = false
    value: any = ''
    type:any =  {}
    loading = false
    currentOrg: any = null
    memberId:any=''
    memberType:any=''
    memberName:any=''
    debtData:any={}
    productId:any=''
    productName:any=''
    businessNo:any=''
    showMask:any=false
    onLoad() {
    }
    mounted() {
      this.status = this.$route.query.status
      this.ranchId = this.$route.query.id
      this.productId = this.$route.query.productId
      this.productName = this.$route.query.productName
      this.businessNo = this.$route.query.businessNo
      if(this.$store.state.base.loginUserCurrentOrganization.organizationId){
        this.memberType = 2  //1-个人 2-企业
        this.memberId =  this.$store.state.base.loginUserCurrentOrganization.organizationId
        this.memberName = this.$store.state.base.loginUserCurrentOrganization.organizationName
      }else {
        this.memberType = 1  // 1-个人 2-企业
        this.memberId = this.$store.state.base.loginUserCurrentOrganization.memberId
        this.memberName = this.$store.state.base.loginUserCurrentOrganization.organizationName
      }
      this.cattleListData()
    }

    // beforeRouteEnter(to,from,next) {
    //   console.log('to.............',to)
    //   next(vm =>{
    //     // if(this.status == 2){
    //     //   this.$route.meta.title = '认养列表'
    //     // }else {
    //     //   this.$route.meta.title = '存栏列表'
    //     // }
    //   })
    // }

    //活体列表
    async cattleListData(sort = {}) {
      let params = {
        memberId:this.memberId,
        memberType:this.memberType,
        ranchId:this.ranchId,
        status:this.status,
        code:'',
        ...sort,
      }
      const { data } = await RanchService.cattleList(params)
      this.list = data
      this.loading = false
      this.finished = true
    }
    //活体列表
    async debtInfoData() {
      let params = {
        memberId:this.memberId,
        memberType:this.memberType,
        ranchId:this.ranchId,
      }
      const { data } = await RanchService.debtInfo(params)
      this.debtData = data
    }
    // 按条件过滤列表
    onChange(picker:any, values: any) {
      switch (values) {
        case '全部':
          break;
        case '按月龄正序排列':
          this.type.inDays = 0;
          break;
        case '按月龄倒序排列':
          this.type.inDays = 1;
          break;
        case '按体重正序排列':
          this.type.weight = 0;
          break;
        case '按体重倒序排列':
          this.type.weight = 1;
          break;
      }
    }
    //确认条件
    onConfirm(value: any) {
      this.value = value
      this.cattleListData(this.type);
      this.type = {}
      this.showPicker = false
    }
    //申请放款信息
    applyQuota(){
      this.debtInfoData()
      this.showMask = true
    }
    //提交
    async onSubmit(){
      let params = {
        memberId:this.memberId,
        memberType:this.memberType,
        memberName:this.memberName,
        ranchId:this.ranchId,
        productId:this.productId,//产品ID
        productName:this.productName,//产品名称
        businessNo:this.businessNo,//业务单号
        applyAmount: this.debtData.applyQuota,//申请借款金额
        applyLoanDeadLine: this.debtData.applyEndDay,//申请借款截止日
      }
      const { data } = await RanchService.submitDebtInfo(params)
      console.log(data,33444)
      if(data.code == 200){
        this.$router.push({
          name: 'result',
          params: {
              btnText: "确定",
              linkUrl: "/testurl",
              typeName: "checked",//1,操作成功 checked 2 操作失败 warning"
              content: '借款成功'//操作成功可不填,操作失败需要传入msg
          }
        })
      } else {
        this.$router.push({
          name: 'result',
          params: {
              btnText: "确定",
              linkUrl: "/testurl",
              typeName: "warning",//1,操作成功 checked 2 操作失败 warning"
              content: data.msg//操作成功可不填,操作失败需要传入msg
          }
        })
      }
    }
    onClose() {
      this.showMask = false
    }
    //活体列表
    goCattleDetail(item:any){
      this.$router.push({ 
        path: "/cattleDetail", 
        query: {   
          memberName:item.memberName,
          inDays:item.inDays,
          code:item.code,
          category:item.category,
          breed:item.breed,
          purpose:item.purpose,
          color:item.color,
          inStallTime:item.inStallTime,
          inStallWeight:item.inStallWeight,
          inStallPrice:item.inStallPrice,
          ranchName:item.ranchName,
          stallName:item.stallName
        }
      })
    }
}
