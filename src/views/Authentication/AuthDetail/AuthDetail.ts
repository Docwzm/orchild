/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";
import {ProfileModel} from "@/model/profile.model";

@Component({})
export default class AuthDetail extends Vue {
    profile = new ProfileModel();
    option1 = [
        { label: '全部商品', value: 0 },
        { label: '新款商品', value: 1 },
        { label: '活动商品', value: 2 },
        { label: '全部商品', value: 3 },
        { label: '新款商品', value: 4 },
        { label: '活动商品', value: 5 },
        { label: '全部商品', value: 6 },
        { label: '新款商品', value: 7 },
        { label: '活动商品', value: 8 }
    ]

    public onCompleted() {
        this.$router.push('authFace');
    }
}
