/**
 * 单元格
 * @desc 单元格【带选择下拉框】
 * @author hqx
 * @time 2019/11/8
 */

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class Cell extends Vue {
    @Prop() title: any;
    @Prop() leftIcon: any;
    @Prop() columns: any;
    @Prop() rightIcon: any;
    @Prop() defaultValue: any;

    valueText = ""
    itemHeight = 48
    pikIndex:any=''
    showPicker: any = false
    mounted() {
        for(let i=0;i<this.columns.length;i++){
            if(this.defaultValue==this.columns[i].text){
                this.pikIndex=i
            }
        }
    }
    created() {
        // let I = navigator.userAgent;
        // let isiPad = (I.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
        // let isiPhone = (!isiPad && I.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
        // this.itemHeight = isiPhone ? 100 : 48
        //console.log("当前机型:" + isiPhone ? '苹果' : '其它')
    }

    chooseValueEvt() {
        this.showPicker = true
    }
    onConfirm(value: any) {
        this.showPicker = false
        // this.valueText = value.text
        this.$emit('onChange', value)

    }
}
