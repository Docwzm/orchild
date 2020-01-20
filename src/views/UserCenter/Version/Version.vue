<template>
    <div class="version">
        <div class="title">
            <h2>{{options.title}}</h2>
        </div>
        <van-divider :style="{ padding: '0 16px'}"/>
        <div class="contain">
            <h4 class="time">{{options.publishDate}}</h4>
            <div class="txt_indent">{{options.context}}</div>
        </div>
    </div>
</template>

<style lang="scss" src="./Version.scss" ></style>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class Version extends Vue {
    options: any = {}
    mounted() {
        this.options = this.$route.query
    }
}
</script>
