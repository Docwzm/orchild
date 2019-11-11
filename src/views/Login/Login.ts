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

    // 是否可以调用手机验证码接口
    canReloadVerifyCode = true;
    verifyCodeLabel = '获取验证码';

    rsa: any = new JSEncrypt();

    // 是否为账号密码登录
    isAccount = false;

    // 登录方式
    loginType: LoginType = LoginType.ByCode;

    // 登录表单
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
        this.getRsaKey()
    }

    // 跳转到注册页面。
    public viewRegister() {
        this.$router.push('register');
    }

    /**
     * 登录
     */
    public handleLogin() {
        if (this.isAccount) {
            if (this.inputFields.account && this.inputFields.password) {
                this.inputFields.type = 1;
                const params = Object.assign({}, this.inputFields);
                params.password = this.rsa.encrypt(params.password);
                UserService.loginV2(params).then(result => {
                    // 跳转到首页
                });
            } else {
                Toast('请输入完整的用户名和密码');
            }
        } else {
            if (!/^1\d{10}$/.test(this.inputFields.mobile)) {
                Toast('请输入正确的手机号');
            } else if (!this.inputFields.verifyCode) {
                Toast('请输入四位验证码');
            } else {
                this.inputFields.type = 2;
                UserService.loginV2(this.inputFields).then(result => {
                    // 跳转到首页
                });
            }
        }
    }

    /**
     * 刷新图片验证码
     */
    public async updateAuthCode() {
        let result = await UserService.getRsaKey();
        this.authCodeImg = `data:image/png;base64,${result.data.png_base64}`;
    }

    /**
     * 获取验证码
     */
    public async getVerifyCode() {
        if (!this.canReloadVerifyCode) {
            return;
        }
        if (!this.inputFields.mobile) {
            Toast('请输入手机号');
        } else if (!/^1[0-9]{10}$/.test(this.inputFields.mobile)) {
            this.$toast('手机格式不正确');
        } else {
            this.canReloadVerifyCode = false;
            UserService.getVerifyCode(this.inputFields.mobile).then(result => {
                Toast('验证码已发送');
            });
            let second = 60;
            let timer = setInterval(() => {
                this.verifyCodeLabel = `${--second}`;
                if (second <= 0) {
                    this.verifyCodeLabel = '获取验证码';
                    this.canReloadVerifyCode = true;
                    clearInterval(timer);
                }
            }, 1000);
        }
    }

    /**
     * 设置公钥
     */
    private async getRsaKey() {
        const { data } = await UserService.getRsaKey();
        this.rsa.setPublicKey(data.key)
    }

}
