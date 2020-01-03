import {Vue,Component} from 'vue-property-decorator'
import {ContractService} from '@/api'
import LoadMore from "@/components/LoadMore/LoadMore.vue"
@Component({
  components: { LoadMore }
})
export default class MyContract extends Vue {
    contractListData:Array<any>=[]
    options: any = {}
    page:any=1
    enableLoadMore:any=true
    totalHeight:any='' //合同图片的总高度
    mounted() {
      //获取页面传参
      this.options = this.$route.query
      this.contractList()
    }
    //上拉加载分页
    onLoadMore(done:any) {
      setTimeout(()=>{
          if(!this.enableLoadMore) {
              return
          }
          this.page = this.page + 1
          this.contractList();
          done();
      }, 200)
    }
    //我的相关合同列表数据
    private async contractList() {
      let params = {
        templateId: this.options.templateId,
        signStatus: 15,
        returnSign: 1,
        pageNo:this.page,
        pageSize:10,
        signerId: this.$store.state.base.loginUserCurrentOrganization.memberId,
        organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.upComingContractList(params)
      // 分页处理
      if(data.records.length < 10) {
        this.enableLoadMore = false
      }
      this.contractListData = this.contractListData.concat(data.records)
    }
    //跳转合同详情页面
    goContractDeatail(val:any){
      this.totalHeight = val.totalPage * val.height
      this.$router.push({
        name: 'contractDetail',
        params: {   
          contractId:val.id,
          code:val.businessCode,
          createTime:val.createTime,
          updatedTime:val.updatedTime,
          createName:val.createName,
          statusName:val.statusName,
          name:val.name,
          contractPicUrl:val.contractPicUrl,
          contractSignList:val.contractSignList,
          totalWidth:val.width, //合同图片的宽度
          totalHeight:this.totalHeight //合同图片的总高度
        }
      })
    }
}
