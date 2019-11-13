/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class AuthCertificate extends Vue {
    public onRegister() {
        this.$router.push('/authDetail');
    }

    /**
     * 上传身份证正面
     * @param file
     */
    public onFrontUpload(file: any) {
        console.log(file);
    }

    /**
     * 上传身份证背面
     * @param file
     */
    public onEndUpload(file: any) {

    }
}
