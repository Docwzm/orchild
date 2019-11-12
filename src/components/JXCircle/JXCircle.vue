<template>
    <div class="JXCircle">
        <van-circle
            v-model="rate"
            :rate="rate"
            :speed="speed"
            :text="text"
            :stroke-width="strokeWidth"
            :size="size"
            :color="color"
        />
    </div>
</template>
<script lang="ts" src="./JXCircle.ts"></script>
<style lang="scss"  src="./JXCircle.scss" ></style>
