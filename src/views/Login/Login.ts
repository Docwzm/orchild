import { Component, Vue, Watch } from 'vue-property-decorator'
import { Toast } from 'vant'
import { UserService } from '@/api/index.ts';
import { OrchidLoginInput } from '@/model/login-input.model';
const { JSEncrypt } = require('jsencrypt');

// 登录类型参数
enum LoginType {

    // 账号密码登录
    ByCode = 1,

    // 短信验证码登录
    ByAccount,

    // 微信免密登录
    ByWxAuto
}

@Component({})
export default class Login extends Vue {
    logoImgUrl = '';
    // 图片验证码
    authCodeImg ='';
    rsa: any;

    // 是否为账号密码登录
    isAccount = false;

    loginType: LoginType = LoginType.ByCode;

    inputFields: OrchidLoginInput = new OrchidLoginInput();

    /** ====================================================== 计算属性[computed] ====================================================== */
    get loginTxt() {
        return this.isAccount ? '手机动态码登录' : '账号密码登录';
    }

    get accountPlc() {
        return this.isAccount ? '请输入登录账号' : '请输入注册手机号';
    }

    async created() {
        this.logoImgUrl = require('../../assets/client_logo.png');
        this.updateAuthCode();
        this.rsa = new JSEncrypt();
        this.getRsaKey()
    }

    mounted() {

    }

    /**
     * 区分多端登录
     * @param type
     */
    private difflogin(type: LoginType) {
        this.loginType = type;
        if (type === LoginType.ByCode) {

        } else if (type === LoginType.ByAccount) {

        } else if (type === LoginType.ByWxAuto) {

        }
    }

    private login(params: any) {

    }

    private async getRsaKey () {
        const { data } = await UserService.getRsaKey();
        this.rsa.setPublicKey(data.key)
    }

    /**
     * 刷新图片验证码
     */
    private async updateAuthCode() {
        let result = await UserService.getRsaKey();
        this.authCodeImg = `data:image/png;base64,${result.data.png_base64}`;
    }

    public async handleLogin () {
        if (this.inputFields.account && this.inputFields.password) {
            const { data } = await UserService.loginV2(this.inputFields);

            console.log('logindata:', data)
        } else {
            Toast('请输入完整的用户名和密码');
        }
    }
}
