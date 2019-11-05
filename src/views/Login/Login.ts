import { Component, Vue } from 'vue-property-decorator'
import { Toast } from 'vant'
import { UserService } from '@/api/index.ts'
// import { JSEncrypt } from 'jsencrypt'// 会报types错误
const { JSEncrypt } = require('jsencrypt')

@Component({})
export default class Login extends Vue {
        
    logoImgUrl: string = ''
    codeImgUrl:string=''
    rsa: any
    loginParams:object={
        mobile: 'hx12345',
        verifyCode: '',
        account:'a12345',
        password:"a12345",
        imgCode:""
    }
    isAccount:boolean=false    

    private created () {
        this.logoImgUrl = require('../../assets/client_logo.png') 
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
        const { account, password } = this.loginParams
        if (!account || !password) {
            Toast('请输入完整的用户名和密码')
        } else {
            const { data } = await UserService.login({
                account: account,
                password: this.rsa.encrypt(password)
            })        

            console.log('logindata:', data)
        }
    }
}
