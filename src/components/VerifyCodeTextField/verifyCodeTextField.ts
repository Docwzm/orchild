/**
 * Created by guanyj on  11/11/19
 */
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import { Toast } from 'vant';
import { UserService } from '@/api';

@Component({})
export default class VerifyCodeTextField extends Vue {
    // 手机号码
    @Model('change', { type: String, required: true, default: '' }) value!: string;

    @Prop() mobile: string = '';
    // 是否可以发起验证码请求
    canReloadVerifyCode = true;

    // 验证码按钮文本
    verifyCodeLabel = '获取验证码';

    public onChange(event: string) {
        this.$emit('change', event);
    }

    /**
     * 获取验证码
     */
    public async getVerifyCode() {
        if (!this.canReloadVerifyCode) {
            return;
        }
        if (!this.mobile) {
            Toast('请输入手机号');
        } else if (!/^1[0-9]{10}$/.test(this.mobile)) {
            this.$toast('手机格式不正确');
        } else {
            this.canReloadVerifyCode = false;
            UserService.getVerifyCode(this.mobile).then(result => {
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
