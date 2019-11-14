import {Component, Vue} from "vue-property-decorator";
import {UserCenterService, UserService} from "@/api";
import {ProfileModel} from "@/model/profile.model";
import {Dialog, Toast} from "vant";

@Component({
    name: 'DCPersonal'
})
export default class DCPersonal extends Vue {
    profile = new ProfileModel();

    // 电子签名图片链接
    signatureImg = '';

    // 是否同意各类协议
    hasProfileAgree = false;

    // 预览电子签名
    previewVisible = false;

    created() {
        this.initPageData();
    }

    /**
     * 查看电子签名
     */
    public viewSignature() {
        if (this.signatureImg) {
            this.previewVisible = true;
        } else {
            if (!this.profile.name) {
                Toast('请输入姓名生成电子签名后再点击查看！');
                return;
            }
            UserService.generateSeal(this.profile.name, 1).then(result => {
                this.signatureImg = result.data.sealUrl;
                this.profile.sealFileName = result.data.sealFile;
            });
        }
    }

    /**
     * 查看隐私声明
     */
    public viewProtocolPrivacy() {
        this.$router.push('/protocolPrivacy');
    }

    /**
     * 查看安心签平台服务协议
     */
    public viewProtocolPlatform() {
        this.$router.push('/protocolPlatform');
    }

    /**
     * 查看CFCA数字证书服务协议
     */
    public viewProtocolCFCA() {
        this.$router.push('/protocolCFCA');
    }

    public onSubmit() {
        const rules = [
            { field: 'name', label: '姓名' },
            { field: 'mobile', label: '手机号码' },
            { field: 'idNo', label: '证件号码' },
            { field: 'effectiveEnd', label: '证件有效期' }
        ];
        const target = rules.find(item => !this.profile[item.field]);
        if (target) {
            Toast(`${target.label}不能为空`);
        } else {
            this.profile.customerName = this.profile.name;
            this.profile.identity = this.profile.idNo;
            this.profile.validPeriods = this.$utils.format(this.profile.effectiveEnd, 'yyyy/MM/dd');

            UserService.applyPersonalCredit(this.profile).then(result => {
                Dialog.alert({
                    title: '开通成功'
                }).then(() => {
                    this.$router.push('/user');
                });
            });
        }
    }

    private initPageData() {
        UserCenterService.getPersonalMemberInfo({
            memberId: this.$store.getters.setLoginUserInfo.memberId
        }).then(result => {
            this.profile = result.data;

            this.viewSignature();
        });
    }
}
