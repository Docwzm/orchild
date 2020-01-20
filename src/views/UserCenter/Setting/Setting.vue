<template>
    <div class="setting">
        <van-cell-group>
            <van-cell title="检查更新" @click="lookVersion" is-link/>
            <van-cell title="版本说明" :value="version" is-link/>
        </van-cell-group>
        <div class="detail-footer">
            <van-button
                class="override btn-block"
                size="large"
                type="primary"
                @click="loingOut"
            >退 出 账 号</van-button>
        </div>
    </div>
</template>

<style lang="scss" src="./Setting.scss" ></style>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { UserService } from "@/api"

@Component({})
export default class Setting extends Vue {
    version = ""
    options = {}
    created() {
        this.getAppVersion()
    }
    loingOut() {
        let that = this
        let params = {
            token: localStorage.getItem("token")
        }
        UserService.loginOut(params).then(res => {
            let _res: any = res
            if (_res.code === 200 || _res.code === "200") {
                that.$toast("退出成功!")
                window.localStorage.clear()
                that.$store.commit("resetData")
                that.$router.push("/login")
            }
        })
    }
    /** 获取版本信息 */
    getAppVersion() {
        let that = this
        let params = {
            appName: this.$constants.appName
        }
        UserService.getAppVersion(params).then(res => {
            let _res: any = res
            if (_res.code === 200 || _res.code === "200") {
                that.version = "v" + res.data.version
                that.options = res.data
            }
        })
    }
    lookVersion() {
        this.$router.push({ path: "version", query: this.options })
    }
}
</script>
