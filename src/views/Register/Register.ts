import { Component, Vue } from 'vue-property-decorator';
import { OrchidLoginInput } from '@/model/login-input.model';
import {Toast} from "vant";
import {UserService} from "@/api";

@Component({})
export default class Login extends Vue {
    verifyCodeLabel = '获取验证码';

    hasProfileAgree = false;

    viewProfileProtocol() {
        this.$router.push('protocol');
    }
    confirmPassword: string = '';

    canReloadVerifyCode = true;

    inputFields: OrchidLoginInput = new OrchidLoginInput();

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
}
