import { Component, Vue } from 'vue-property-decorator'
import { Toast } from 'vant'
import UserService from '@/api/user.service'
// import { JSEncrypt } from 'jsencrypt'// 会报types错误
const { JSEncrypt } = require('jsencrypt')

@Component({})
export default class Login extends Vue {
    username: string = 'hx12345'
    password: string = 'a123456'
    smsCode: string = ''
    codeImgUrl: string = ''
    rsa: any

    private created () {
        this.codeImgUrl = require('../../assets/login_code.jpg')
        this.rsa = new JSEncrypt()
        this.getRsaKey()
    }

    private async getRsaKey () {
        const { data } = await UserService.getRsaKey()
        console.log('data:', data)
        this.rsa.setPublicKey(data.key)
    }
    private async handleLogin () {
        const { username, password } = this
        if (!username || !password) {
            Toast('请输入完整的用户名和密码')
        } else {
            const { data } = await UserService.login({
                account: this.username,
                password: this.rsa.encrypt(this.password)
            })

            console.log('logindata:', data)
        }
    }
}
