import {Vue,Component} from 'vue-property-decorator'
import {ContractService} from '@/api'
@Component({
  components: {}
})
export default class RanchDetail extends Vue {
    options:any = {}
    mounted() {
      this.options = this.$route.query
    }
    goCattleList(v:any){
        this.$router.push({ 
            path: "/cattleList", 
            query: {   
                status:v,
                id:this.options.id
            }
        })
    }
}
