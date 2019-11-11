import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class CreditApplication extends Vue {
    creditMoney = ''
    radioStatus = '1'
    private changeEvt() {
        if (this.radioStatus == "1") {
            this.radioStatus = '0'
        } else {
            this.radioStatus = '1'
        }
    }

}