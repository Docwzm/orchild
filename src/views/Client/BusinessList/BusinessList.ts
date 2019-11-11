import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import ListItem from '@/components/ListItem/ListItem.vue'
@Component({
    components: { Cell,ListItem}
})
export default class CreditApplication extends Vue {
    list = [
        {time:'2019/10/31 10:20:32',id:1,statusStr:'已完成',tip:'还款:',money:1234},
        {time:'2019/10/31 10:20:32',id:2,statusStr:'已完成',tip:'还款:',money:1234},
        {time:'2019/10/31 10:20:32',id:3,statusStr:'已完成',tip:'还款:',money:1234},
    ]
    currentDate: any
    loading = false
    finished = false
    showTimeMask = false

    private onLoad () {
    
    }
    private async timePicker () {
        console.log(2222)
        this.showTimeMask =  !this.showTimeMask
    }
    private async closeMask () {
        console.log(2222)
        this.showTimeMask =  !this.showTimeMask
    }
}
