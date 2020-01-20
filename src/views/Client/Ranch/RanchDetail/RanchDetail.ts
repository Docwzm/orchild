import {Vue,Component} from 'vue-property-decorator'
import {RanchService} from '@/api'
@Component({
  components: {}
})
export default class RanchDetail extends Vue {
    options:any = {}
    mounted() {
      this.options = this.$route.query
      console.log(  this.options , 2445555)
      this.cattleListData()
    }
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
        ranchId: this.options.id,
      }
      const { data } = await RanchService.categoryCattle(params)
    }
    goCattleList(v:any){
        this.$router.push({ 
            path: "/cattleList", 
            query: {   
                status:v,
                id:this.options.id,
                productName:this.options.productName,
                productId:this.options.productId,
                businessNo:this.options.businessNo,
            }
        })
    }
}
