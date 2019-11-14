import {Component, Model, Prop, Vue} from "vue-property-decorator";

/**
 * 表单内日期选择器
 * @desc 结合`van-cell-group`使用。
 * @author guanyj
 * @time 2019/11/13
 * @class CellAreaPicker
 */
@Component({})
export default class CellDatetimePicker extends Vue {
    @Model('change') value!: Date;

    @Prop({default: false}) required!: boolean;
    @Prop({default: '请选择'}) placeholder!: string;
    @Prop({default: ''}) label!: string;
    @Prop({default: 'yyyy/MM/dd'}) format!: string;
    @Prop({default: 'date'}) type!: string;

    get hintText(): string {
        if (this.value) {
            return this._format(this.value, this.format);
        }
        return '';
    }

    pickerVisible = false;

    public onConfirm(event: any) {
        this.$emit('change', event);
        this.pickerVisible = false;
    }

    private _format(date: string | Date, f: string = 'yyyy-MM-dd hh:mm:ss'): string {
        if (!(Date as any).prototype['format']) {
            (Date as any).prototype['format'] = function (fmt: string) {
                const o: any = {
                    'M+': this.getMonth() + 1,
                    'd+': this.getDate(),
                    'h+': this.getHours(),
                    'm+': this.getMinutes(),
                    's+': this.getSeconds(),
                    'q+': Math.floor((this.getMonth() + 3) / 3),
                    'S': this.getMilliseconds()
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (const k in o) {
                    if (new RegExp('(' + k + ')').test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                    }
                }
                return fmt;
            };
        }
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return (date as any)['format'](f);
    }
}
