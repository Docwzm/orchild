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
    onLoad() {
    }
    mounted() {
      this.status = this.$route.query.status
      this.ranchId = this.$route.query.id
      this.cattleListData()
    }

    // beforeRouteEnter(to,from,next) {
    //   next(vm =>{
    //     if(this.status == 2){
    //       this.$route.meta.title = '认养列表'
    //     }else {
    //       this.$route.meta.title = '存栏列表'
    //     }
    //   })
    // }

    //活体列表
    async cattleListData(sort = {}) {
      if(this.$store.state.base.loginUserCurrentOrganization.organizationId){
          var memberId =  this.$store.state.base.loginUserCurrentOrganization.organizationId
          var memberType = 2  //1-个人 2-企业
      }else {
          var memberId = this.$store.state.base.loginUserCurrentOrganization.memberId
          var memberType = 1  // 1-个人 2-企业
      }
      let params = {
        memberId,
        memberType,
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
}
