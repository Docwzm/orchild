import { Component, Vue, Watch } from 'vue-property-decorator'
import { Toast, Dialog } from 'vant'
import { UserService } from '@/api/index.ts';
import { OrchidLoginInput } from '@/model/login-input.model';
import {RoleModel} from "@/model/role.model";
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

    /**
     * 跳转到注册页面。
     */
    public viewRegister() {
        this.$router.push('register');
    }

    /**
     * 跳转到重置密码页面
     */
    public viewResetPwd() {
        this.$router.push('resetPwd');
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
                    this.setAppInfo(result.data);
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
                    this.setAppInfo(result.data);
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
        this.inputFields.uuid = result.data.uuid;
    }

    /**
     * 设置公钥
     */
    private async getRsaKey() {
        const { data } = await UserService.getRsaKey();
        this.rsa.setPublicKey(data.key)
    }

    /**
     * 配置项目信息
     * @param params
     */
    private setAppInfo(params: any) {
        // 1.缓存token.
        localStorage.setItem('token', params.token);
        // 2.同步用户信息
        this.$store.commit('setLoginUserInfo', params.userDetail);
        this.$store.commit('setLoginUserOrganizations', params.userReponseDetail);
        let target = (params.userReponseDetail || []).find((item: RoleModel) => new RoleModel(item).isOrganization);
        this.$store.commit('setLoginUserCurrentOrganization', target);
        // 3.准备字典数据
        this.$store.dispatch('getDictionaryData');
        // 4.跳转到目标页面
        if ((params.userDetail as RoleModel).isCredit === 0) {
            Dialog.alert({
                title: '认证提示',
                message: '您好！您尚未完成实名认证，客服人员会在您注册成功12小时内联系您完成实名认证。',
            }).then(() => {
                this.$router.push('/authCertificate');
            });
        } else {
            this.$router.push('/home');
        }
    }
}
