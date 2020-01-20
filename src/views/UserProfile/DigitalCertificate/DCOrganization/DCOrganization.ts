/**
 * Created by guanyj on  11/14/19
 */
import {Component, Vue} from "vue-property-decorator";
import {ProfileModel} from "@/model/profile.model";
import {HomeService, UserCenterService, UserService} from "@/api";
import {Dialog, Toast} from "vant";

@Component({
    name: 'DCOrganization'
})
export default class DCOrganization extends Vue {
    profile = new ProfileModel();

    // 电子签名图片链接
    signatureImg = '';

    // 授权书图片链接
    authCertificateImg = '';

    // 机构证书申请表
    orgCertificateImg = '';

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
            if (!this.profile.compName) {
                Toast('请输入姓名生成电子签名后再点击查看！');
                return;
            }
            UserService.generateSeal(this.profile.compName, 2).then(result => {
                this.signatureImg = result.data.sealUrl;
                this.profile.sealFileName = result.data.sealFile;
            });
        }
    }

    /**
     * 上传授权书
     * @param event
     */
    public afterAuthCertificateUpload(event: any) {
        this.uploadFile(event.file).then(result => {
            Toast('上传成功');
            this.profile.authFileName = this.authCertificateImg = result.data;
        });
    }

    /**
     * 上传机构证书申请表
     * @param event
     */
    public afterOrgCertificateUpload(event: any) {
        this.uploadFile(event.file).then(result => {
            Toast('上传成功');
            this.profile.applyFileName = this.orgCertificateImg = result.data;
        });
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

    /**
     * 申请开通数字证书
     */
    public onSubmit() {
        const rules = [
            { field: 'compName', label: '机构全称' },
            { field: 'idNo', label: '证件号码' },
            { field: 'agentName', label: '授权人姓名' },
            { field: 'mobile', label: '授权人手机号码' },
            { field: 'agentIdentityNo', label: '授权人证件号码' },
            { field: 'authFileName', label: '授权书' },
            { field: 'sealFileName', label: '电子签名' },
        ];
        const target = rules.find(item => !this.profile[item.field]);
        if (target) {
            Toast(`${target.label}不能为空`);
        } else {
            // 处理数据
            const params: ProfileModel = Object.assign({}, this.profile);
            params.customerName = this.profile.compName;
            params.identity = this.profile.idNo;
            UserService.applyOrganizationCredit(params).then(result => {
                Dialog.alert({
                    title: '开通成功'
                }).then(() => {
                    this.$router.push('/user');
                });
            });
        }
    }

    private initPageData() {
        console.log(this.$store.getters.loginUserCurrentOrganization);
        UserCenterService.getOrganizationInfo({orgId: this.$store.getters.loginUserCurrentOrganization.organizationId}).then(result => {
            this.profile = result.data;
            if (this.profile.compName) {
                this.viewSignature();
            }
        });
    }

    private uploadFile(file: any) {
        const formData = new FormData();
        formData.append('target', '1');
        formData.append('file', file);
        return HomeService.uploadFile(formData);
    }
}
