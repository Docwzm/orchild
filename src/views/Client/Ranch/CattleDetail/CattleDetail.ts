import {Vue,Component} from 'vue-property-decorator'
import {RanchService} from '@/api'
import FieldPicker from '@/components/FieldPicker/FieldPicker.vue'
@Component({
  components: {FieldPicker}
})
export default class CattleList extends Vue {
    options:any={}
    mounted() {
      this.options = this.$route.query
    }
}
