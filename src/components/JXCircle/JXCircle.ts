/**
 * 环形图
 * @desc 环形图表
 * @author hqx
 * @time 2019/11/8
 */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class JXCircle extends Vue {
    @Prop() private rate: any;
    @Prop() private speed: any;
    @Prop() private text: any;
    @Prop() private strokeWidth: any;
    @Prop() private size: any;
    @Prop() private color: any;
    @Prop() private layerColor: any;
}
