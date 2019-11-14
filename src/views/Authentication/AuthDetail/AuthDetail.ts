/**
 * Created by guanyj on  11/12/19
 */
import {Component, Vue} from "vue-property-decorator";
import {ProfileModel} from "@/model/profile.model";
import {DICTIONARY_CONST} from '../common/dictionary.const';

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
        this.profile.birthday = this.amendBirthday();
        this.profile.age = this.profile.birthday && new Date().getFullYear() - (this.profile.birthday as Date).getFullYear();
        this.profile.idType = 275;
        this.profile.idNo = query.idNo;
        this.profile.effectiveEnd = query.effectiveEnd;
        this.profile.address = query.address;
    }

    public onCompleted() {
        this.$router.push('authFace');
    }

    private getDictionaryListByType(code: string): dictListType {
        return this.$store.getters.getDictionaryListByType(code).map((item: any) => ({value: item.id, label: item.dictValue}));
    }

    private getProfileValue(key: string, list: dictListType): any {
        let source = this.$route.query as ProfileModel;
        if (source[key]) {
            let target = list.find((item: any) => item.label === source[key]);
            return target && target.value;
        }
        return null;
    }

    private amendNationValue(): any {
        let source = this.$route.query as ProfileModel;
        if (source.nation) {
            let target = this.nationList.find(item => item.label.startsWith(source.nation));
            return target && target.value;
        }
        return null;
    }

    private amendBirthday(): any {
        let source = this.$route.query as ProfileModel;
        if (source.birthday) {
            return new Date(source.birthday.replace(/^(\d{4})(\d{2})(\d{2})$/g, '$1/$2/$3'));
        }
        return null;
    }
}
