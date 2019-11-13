import { Component, Vue } from 'vue-property-decorator';
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import Cell from '@/components/Cell/Cell';
import {CategoryService} from "@/api";


@Component({
    components: { JXCircle, Cell }
})
export default class Category extends Vue {
    value = 0;
    currentRate = 60;
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    };
    option = [
        { text: '全部商品士大夫撒地方', value: 0 },
        { text: '新款商品撒打发斯蒂芬', value: 1 },
        { text: '活动商品撒的发生的', value: 2 }
    ]

    get text() {
        return this.currentRate.toFixed(0) + '%'
    }


    created() {
        this.getDataInfo();
    }


    lookLog() {
        this.$router.push({ name: "BusinessList" });
    }
    onChange(picker: any, value: any, index: any) {
    }
    apply() {
        this.$router.push("/apply")
    }
    //还款
    refound() {
        this.$router.push('/refound');
    }

    // 初始化信息
    async getDataInfo() {
        let obj_1 = {
            memberId : '500157',
            orgId: '105219'
        };
        let obj_2 = {
            orgId : " ",
            appName : "client_mini"
        };
       const data_1 =  await CategoryService.getCreditInfo(obj_1);
       const data_2 = await CategoryService.getPersonalInfo(obj_2);
    }
}
