/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class AuthCertificate extends Vue {
    public onRegister() {
        this.$router.push('/authDetail');
    }
}
