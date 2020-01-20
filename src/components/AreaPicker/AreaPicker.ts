
import {Component, Vue, Prop, Model, Emit, Ref} from 'vue-property-decorator'
import {areaJson} from './area';

/**
 * 省市区选择器
 * @desc 详细功能参考`van-area`组件
 * @author guanyj
 * @time 2019/11/13
 * @class AreaPicker
 */
@Component({
    name: 'AreaPicker'
})
export default class AreaPicker extends Vue {
    @Prop({default: false}) public visible!: boolean;
    // 选中省市县code。以逗号分隔，如 "110000,110100,110101"
    @Prop() value!: string;

    // 省市区数据
    columns = areaJson;

    // 回显当前地址
    get currentArea() {
        if (!this.value) {
            return null;
        }
        const codes = this.value.split(',');
        return codes[codes.length - 1];
    }

    @Emit('confirm')
    public onConfirm(event: Array<{name: string, code: any}>): string {
        return event.map(item => item.code).join(',');
    }

    @Emit('close')
    public onClose() {}

    /**
     * 获取省市区名称
     * @param codes
     */
    public getAreaFullNameByCode(codes: string): string {
        if (!codes) {
            throw new Error('请传入正确的省市区数据');
        }
        return codes.split(',').map((code: string, index: number) => {
            if (index === 0) {
                return this.columns.province_list[code];
            } else if (index === 1) {
                return this.columns.city_list[code];
            } else if (index === 2) {
                return this.columns.county_list[code];
            } else {
                return '';
            }
        }).join('');
    }
}
