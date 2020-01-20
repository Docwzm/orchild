/**
 * @desc 结果页面
 * @author hqx
 * @time 2019/11/13
 */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Result extends Vue {
    options = {}
    userInfo = {
        defaultOrganization: {
            nature: ''
        }
    }
    created() {
        //个人基本信息,在首页已请求方法
        this.userInfo = this.$store.state.base.personalCentreInfo
    }

    torealNameAuthEvt() {
        this.$router.push("/authCertificate")
    }
    toapplyCAEvt() {
        let nature: any = this.userInfo.defaultOrganization.nature
        if (nature == 1) {
            this.$router.push("/dcPersonal")
        } else {
            this.$router.push("/dcOrganization")
        }
    }
    toInfoEvt() {
        let nature: any = this.userInfo.defaultOrganization.nature
        if (nature == 1) {
            this.$router.push("/personalInfo")
        } else {
            this.$router.push("/orgInfo")
        }
    }
    settingEvt() {
        this.$router.push("/setting")
    }
}
