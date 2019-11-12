/**
 * @desc 结果页面
 * @author hqx
 * @time 2019/11/12
 */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class PersonalInfo extends Vue {
    showPicker = false
    formdata = {}//表单数据
    eduColumns = []//教育程度列表
    industryColumns = []//从事行业
    professionColumns = []//职业类型
    /**教育程度 */
    onEduConfirm() {
        this.showPicker = false
    }
    /**从事行业 */
    onIndustryConfirm() {
        this.showPicker = false
    }
    /**职业类型 */
    onProfessionConfirm() {
        this.showPicker = false
    }

    onEduClick() {
        this.showPicker = true
    }
    onIndustryClick() {
        this.showPicker = true
    }
    onProfessionClick() {
        this.showPicker = true
    }
}
