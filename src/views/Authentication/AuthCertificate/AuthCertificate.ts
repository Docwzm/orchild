/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";
import {UserService} from "@/api";
import {Toast} from "vant";
import {ProfileModel} from "@/model/profile.model";

@Component({})
export default class AuthCertificate extends Vue {
    private ip: string = '116.211.87.2';

    cardFrontImg = '';
    cardBackImg = '';

    certificateInfo = new ProfileModel();

    created() {
        // UserService.queryCertificateIp().then(result => {
        //
        // });
    }

    /**
     * 上传身份证正面
     * @param event
     */
    public onFrontUpload(event: any) {
        console.log(event);
        this.personalOcr(event.file, 0).then(result => {
            this.cardFrontImg = event.content;
            const {name, birth, address, gender, identiNo, nation} = result.data;
            this.certificateInfo.birthday = birth;
            this.certificateInfo.name = name;
            this.certificateInfo.address = address;
            this.certificateInfo.gender = gender;
            this.certificateInfo.idNo = identiNo;
            this.certificateInfo.nation = nation;
            this.attachCover(event.file, 'IdCardPros');
        }).catch(e => {
            if (e.code === 610) {
                Toast('识别失败,上传图片不是身份证');
            } else if (e.code === 612) {
                Toast('识别失败');
            } else {
                Toast(`${e.msg}`);
            }
        });
    }

    /**
     * 上传身份证背面
     * @param event
     */
    public onEndUpload(event: any) {
        this.personalOcr(event.file, 1).then(result => {
            this.cardBackImg = event.content;
            this.certificateInfo.effectiveEnd = result.data.expireDate;
            this.attachCover(event.file, 'idCardCons');
        }).catch(e => {
            if (e.code === 610) {
                Toast('识别失败,上传图片不是身份证');
            } else if (e.code === 612) {
                Toast('识别失败');
            } else {
                Toast(`${e.msg}`);
            }
        });
    }

    /**
     * 提交-下一步
     */
    public handleNext() {
        if (!this.cardFrontImg) {
            Toast('请上传身份证正面');
        } else if (!this.cardBackImg) {
            Toast('请上传身份证反面');
        } else {
            this.$router.push({
                path: '/authDetail',
                query: this.certificateInfo
            });
        }
    }

    /**
     * ocr识别
     * @param file
     * @param idcardSide
     */
    private personalOcr(file: any, idcardSide: number) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('idcardSide', `${idcardSide}`);
        formData.append('ip', this.ip);
        formData.append('appName', 'customer');
        return UserService.personalOcr(formData);
    }

    /**
     * 绑定身份证图片
     * @param file
     * @param alias
     */
    private attachCover(file: any, alias: string) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('source', '客户端小程序');
        formData.append('alias', alias);
    }
}
