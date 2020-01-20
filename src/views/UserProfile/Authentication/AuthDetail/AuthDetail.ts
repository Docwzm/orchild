/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";
import {ProfileModel} from "@/model/profile.model";
import {DICTIONARY_CONST} from '../common/dictionary.const';
import {Toast} from "vant";

type dictListType = Array<{value: number, label: string}>;

@Component({
    name: 'AuthDetail'
})
export default class AuthDetail extends Vue {
    profile = new ProfileModel();

    // 性别列表
    get genderList(): dictListType {
        return this.getDictionaryListByType(DICTIONARY_CONST.gender);
    }

    // 民族列表
    get nationList(): dictListType {
        return this.getDictionaryListByType(DICTIONARY_CONST.nation);
    }

    // 证件类型
    get cardTypeList(): dictListType {
        return this.getDictionaryListByType(DICTIONARY_CONST.cardType);
    }

    // 婚姻状况
    get marriageList(): dictListType {
        return this.getDictionaryListByType(DICTIONARY_CONST.marriage);
    }

    // 教育列表
    get eduList() {
        return this.getDictionaryListByType(DICTIONARY_CONST.edu);
    }

    // 行业列表
    get industryList() {
        return this.getDictionaryListByType(DICTIONARY_CONST.industry);
    }

    // 职业列表
    get jobList() {
        return this.getDictionaryListByType(DICTIONARY_CONST.job);
    }

    created() {
        console.log('query:', this.$route.query);
        let query = this.$route.query as ProfileModel;
        // 由于身份证识别的不是字典值。此处需要进行转换。
        this.profile.name = query.name;
        this.profile.gender = this.getProfileValue('gender', this.genderList);
        this.profile.nation = this.amendNationValue();
        this.profile.birthday = this.amendDateValue('birthday');
        this.profile.age = this.profile.birthday && new Date().getFullYear() - (this.profile.birthday as Date).getFullYear();
        this.profile.idType = 275;
        this.profile.idNo = query.idNo;
        this.profile.effectiveEnd = this.amendDateValue('effectiveEnd');
        this.profile.address = query.address;
    }

    /**
     * 下一步
     */
    public onCompleted() {
        // 验证规则配置
        const requiredFields = [
            { field: 'name', message: '用户姓名' },
            { field: 'gender', message: '性别' },
            { field: 'nation', message: '民族' },
            { field: 'birthday', message: '出生日期' },
            { field: 'idNo', message: '证件号码' },
            { field: 'effectiveEnd', message: '证件有效期' },
            { field: 'region', message: '常住地区' },
            { field: 'address', message: '常住地址' },

            { field: 'marriage', message: '婚姻状况' },
            { field: 'edu', message: '教育程度' },
            { field: 'industry', message: '从事行业' },
            { field: 'job', message: '职业类型' }
        ];
        let target = requiredFields.find((item) => !this.profile[item.field]);
        if (target) {
            Toast(`用户${target.message}不能为空。`);
            return;
        }

        // 格式化时间
        const profile = new ProfileModel();
        Object.keys(this.profile).forEach(key => {
            if (this.profile[key] instanceof Date) {
                profile[key] = this.$utils.format(this.profile[key], 'yyyy/MM/dd');
            } else {
                profile[key] = this.profile[key];
            }
        });

        this.$router.push({
            path: '/authFace',
            query: profile
        });
    }

    /**
     * 格式化字典
     * @param code
     */
    private getDictionaryListByType(code: string): dictListType {
        return this.$store.getters.getDictionaryListByType(code).map((item: any) => ({value: item.id, label: item.dictValue}));
    }

    /**
     * 修正普通picker值; label -> value
     * @param key
     * @param list
     */
    private getProfileValue(key: string, list: dictListType): any {
        let source = this.$route.query as ProfileModel;
        if (source[key]) {
            let target = list.find((item: any) => item.label === source[key]);
            return target && target.value;
        }
        return null;
    }

    /**
     * 修正民族字段。由于字典中民族与接口返回不一致。已是否为相同起头判断
     */
    private amendNationValue(): any {
        let source = this.$route.query as ProfileModel;
        if (source.nation) {
            let target = this.nationList.find(item => item.label.startsWith(source.nation));
            return target && target.value;
        }
        return null;
    }

    /**
     * 修正日期类型字段
     */
    private amendDateValue(field: string): any {
        let source = this.$route.query as ProfileModel;
        if (source[field]) {
            return new Date(source[field].replace(/^(\d{4})(\d{2})(\d{2})$/g, '$1/$2/$3'));
        }
        return null;
    }
}
