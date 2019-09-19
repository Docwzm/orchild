import { Component, Vue } from 'vue-property-decorator'
import { Toast } from 'vant'

@Component({})
export default class Login extends Vue {
    username: string = ''
    password: string = ''
    smsCode: string = ''
    codeImgUrl: string = ''

    // public data () {
    //     return {
    //         // username: '',
    //         // title: this.$route.name,
    //         // password: '',
    //         // smsCode:"",
    //         // codeImgUrl: ''
    //     }
    // }

    private created () {
        this.codeImgUrl = require('../../assets/login_code.jpg')
    }

    private handleLogin () {
        const { username, password } = this
        if (!username || !password) {
            Toast('请输入完整的用户名和密码')
        } else {
            // this.login({ username, password });
            // this.loginLoading();
        }
    }
}
