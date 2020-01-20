/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";
import {Route} from "vue-router";

@Component({})
export default class Authentication extends Vue {
    /**
     * 头部公用区域
     */
    activeIndex = 0;
    noticeMessage = '温馨提示：为保障您的权益，需先进行身份验证。';

    created() {
        this.updateTitle(this.$router.currentRoute);

        this.$router.beforeEach((to, from, next) => {
            this.updateTitle(to);
            next();
        });
    }

    /**
     * 更新实名认证进度
     * @param route
     */
    private updateTitle(route: Route) {
        if (route.name === 'certificate') {
            this.activeIndex = 0;
            this.noticeMessage = '温馨提示：为保障您的权益，需先进行身份验证。';
        } else if (route.name === 'detail') {
            this.activeIndex = 1;
            this.noticeMessage = '请确认下列信息与您的信息是否一致。';
        } else if (route.name === 'face') {
            this.activeIndex = 2;
            this.noticeMessage = '为验证您是本人操作，需进行人脸识别。';
        }
    }
}
