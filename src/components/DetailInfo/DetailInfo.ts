/**
 * 普通搜索框
 * @desc 普通搜索框【带🔍图标】
 * @author qinmenghuan
 */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class DetailInfo extends Vue {
    @Prop() private DetailData:any;
    @Prop() private DetailKeys:any;
}
