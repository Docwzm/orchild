/**
 * @desc 结果页面
 * @author hqx
 * @time 2019/11/13
 */

import { Component, Vue, Prop } from 'vue-property-decorator'
import ListItem from '@/components/ListItem/ListItem.vue'

@Component({})
export default class Result extends Vue {
    showSuccess = "checked"
    showError = "warning"
    torealNameAuth = ""
    toapplyCA = ""
    toInfo = ""
    options = {}
    created() {
        this.torealNameAuth = this.showSuccess
        this.toapplyCA = this.showSuccess
        this.toInfo = this.showSuccess
    }
}
