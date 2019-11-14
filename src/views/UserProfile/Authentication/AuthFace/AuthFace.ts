/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";
import {Toast} from "vant";
import {UserService} from "@/api";
import {ProfileModel} from "@/model/profile.model";

@Component({})
export default class AuthFace extends Vue {
    // 人脸照片
    faceImg: string = '';
    faceFile: any = null;

    profile = new ProfileModel();

    created() {
        this.profile = this.$route.query as ProfileModel;
    }

    /**
     * 拍照
     * @param event
     */
    public handleFaceCollect(event: any) {
        this.faceImg = event.content;
        this.faceFile = event.file;
    }

    /**
     * 人脸Ocr识别
     */
    public personalOcr() {
        if (!this.faceFile) {
            Toast('请上传照片后采集人脸!');
        } else {
            const formData = new FormData();
            formData.append('file', this.faceFile);
            formData.append('name', this.profile.name);
            formData.append('appName', 'customer');
            formData.append('identyNo', this.profile.idNo);
            UserService.personalFaceOcr(formData).then((result: any) => {
                if (result.data.score >= 80) {
                    Toast(result.msg);
                    // 绑定图片
                    this.bindFaceImg();
                    this.faceAuth();
                } else {
                    Toast('人脸核身失败!');
                }
            })
        }
    }

    /**
     * 绑定人脸照片
     */
    private bindFaceImg() {
        const formData = new FormData();
        formData.append('file', this.faceFile);
        formData.append('source', '客户端小程序');
        formData.append('alias', 'face');
        UserService.attachCover(formData).then(() => {});
    }

    /**
     * 人脸认证
     */
    private faceAuth() {
        UserService.creditAuth({
            identity: this.profile.idNo,
            customerName: this.profile.name,
            identityType: this.profile.idType,
            appName: "customer",
            address: this.profile.address
        }).then(() => {
            this.saveProfile();
        });
    }

    /**
     * 保存用户信息
     */
    private saveProfile() {
        let regions = this.profile.region.split(',');
        UserService.saveProfile({
            ...this.profile,
            addressList: [{
                typeCode: 122,
                address: this.profile.address,
                province: regions[0],
                city: regions[1],
                area: regions[2]
            }],
            id: this.$store.getters.loginUserInfo.memberId
        }).then(result => {
            Toast('实名认证成功');
            setTimeout(() => {
                this.$router.push('/home');
            }, 2000);
            this.createSnapshot(result.data.creditTime.replace(/\s|-|:|\//g, ''));
        });
    }

    /**
     * 创建附件快照
     * @param date
     */
    private createSnapshot(date: any) {
        UserService.attachSnapshot({
            businessNo: 'credit' + '-' + this.$store.getters.loginUserInfo.memberId + '-' + date
        }).then(() => {})
    }
}
