/**
 * @desc 结果页面
 * @author hqx
 * @time 2019/11/13
 */

import { Component, Vue, Prop } from 'vue-property-decorator'
import ListItem from '@/components/ListItem/ListItem.vue'

@Component({})
export default class Result extends Vue {
    options = {}
    userInfo = {
        defaultOrganization: {
            nature: ''
        }
    }
    created() {

        this.userInfo = this.$store.state.base.personalCentreInfo
    }

    torealNameAuthEvt() {
        this.$router.push("/authCertificate")
    }
    toapplyCAEvt() { }
    toInfoEvt() {
        this.$router.push("/personalInfo")
    }
}
