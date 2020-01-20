/**
 * Created by guanyj on  11/12/19
 */
import { Component, Vue } from 'vue-property-decorator';
import {OrchidLoginInput} from "@/model/login-input.model";
import {Toast} from "vant";
import {UserService} from "@/api";
const { JSEncrypt } = require('jsencrypt');

@Component({})
export default class ResetPwd extends Vue {
    rsa: any = new JSEncrypt();

    inputFields = new OrchidLoginInput();

    confirmPassword: string = '';

    created() {
        this.getRsaKey();
    }

    /**
     * 重置密码
     */
    public onReset() {
        if (!this.inputFields.mobile) {
            Toast('请输入手机号码');
        } else if (!/^1[0-9]{10}$/.test(this.inputFields.mobile)) {
            Toast('手机号格式不正确');
        } else if (!this.inputFields.verifyCode) {
            Toast('请输入验证码');
        } else if (!this.inputFields.password) {
            Toast('请输入密码');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/.test(this.inputFields.password)) {
            Toast('密码6到16位并至少包含一个字母和数字');
        } else if (this.inputFields.password !== this.confirmPassword) {
            Toast('两次密码输入不一致');
        } else {
            const params = Object.assign({}, this.inputFields);
            params.password = this.rsa.encrypt(params.password);
            UserService.authResetPwd(params).then(result => {
                Toast(result.data.msg);
                this.$router.replace({name: 'login'});
            });
        }
    }

    /**
     * 设置公钥
     */
    private async getRsaKey() {
        const { data } = await UserService.getRsaKey();
        this.rsa.setPublicKey(data.key);
    }
}
