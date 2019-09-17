<template>
    <div class="about">
        <h1>This is an about page</h1>

        <van-button type="primary">主要按钮</van-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class About extends Vue {}
</script>

<style lang="scss">
    h1{
        font-size:75px;
    }
</style>