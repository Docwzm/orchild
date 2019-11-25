<template>
    <div class="page_msg msg_success js_show">
        <div class="JX-msg">
            <div class="JX-msg__icon-area">
                <van-icon
                    :name="showName"
                    :size="$utils.platform()?'300px':'130px'"
                    :color="color"
                />
            </div>
            <div class="JX-msg__text-area">
                <h1 class="JX-msg__title">{{showText}}</h1>
                <p class="JX-msg__desc">{{options.content}}</p>
            </div>
            <div class="JX-msg__opr-area">
                <p class="JX-btn-area">
                    <a href="javascript:history.back();" v-bind:class="[classType]">确定</a>
                </p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped src="./Result.scss"></style>
<script lang="ts" src="./Result.ts"></script>
