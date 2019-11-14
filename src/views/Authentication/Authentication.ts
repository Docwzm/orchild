/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class Authentication extends Vue {
    activeIndex = 0;
    noticeMessage = '温馨提示：为保障您的权益，需先进行身份验证。';

    created() {
        this.$router.beforeEach((to, from, next) => {
            if (to.name === 'certificate') {
                this.activeIndex = 0;
                this.noticeMessage = '温馨提示：为保障您的权益，需先进行身份验证。';
            } else if (to.name === 'detail') {
                this.activeIndex = 1;
                this.noticeMessage = '请确认下列信息与您的信息是否一致。';
            } else if (to.name === 'face') {
                this.activeIndex = 2;
                this.noticeMessage = '为验证您是本人操作，需进行人脸识别。';
            }
            next();
        });
    }
}
