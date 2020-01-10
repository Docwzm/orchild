/**
 * @desc 结果页面
 * @author hqx
 * @time 2019/11/12
 *  例:this.$router.push({
 *           name: 'result',
 *           params: {
 *               btnText: "确定",
                 linkUrl: "/testurl",
 *               typeName: "checked",//1,操作成功 checked 2 操作失败 warning"
 *               content:""//操作成功可不填,操作失败需要传入msg
 *           }
 *       })
 */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Result extends Vue {
    showName = "checked"
    showText = ""
    color = "#07C160"
    classType = ""
    okBtn = "确定"
    options: any = {}
    created() {
        this.options = this.$route.params;
        this.showName = this.$route.params.typeName
        this.okBtn = this.options.btnText ? this.options.btnText : "确定"
        if (this.showName == "checked") {
            this.color = "#07C160"
            this.showText = "操作成功"
            this.classType = "JX-btn JX-btn_sucess"
        } else {
            this.color = "#FA5151"
            this.showText = "操作失败"
            this.classType = "JX-btn JX-btn_fail"
        }
    }
    goback() {
        if (this.options.linkUrl) {
            // let aa=this.options.linkUrl
            this.$router.replace({
                path:this.options.linkUrl
            })
        } else {
            this.$router.go(-1)
            // window.history.back(-1); 
        }
    }
}
