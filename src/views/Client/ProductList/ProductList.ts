import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import ListItem from '@/components/ListItem/ListItem.vue'
import TextSearch from '@/components/TextSearch/TextSearch.vue'
import FieldPicker from '@/components/FieldPicker/FieldPicker.vue'
@Component({
    components: { TextSearch, ListItem, FieldPicker }
})
export default class CreditApplication extends Vue {
    list = [
        { time: '牛腱', id: 1, tip: '牛板筋', num: '100件' },
        { time: '牛腱', id: 2, tip: '牛板筋', num: '100件' }
    ]
    currentDate: any
    loading = false
    finished = false
    showTimeMask = false

    private onLoad () {

    }
    private async searchInputHandle () {
        console.log(2222)
        this.showTimeMask = !this.showTimeMask
    }
}
