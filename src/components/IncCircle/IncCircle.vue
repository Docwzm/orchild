<template>
    <div>
        <van-circle
        v-model="currentRate"
        :rate="rate"
        :speed="speed"
        :text="text"
        :stroke-width = "stroke-width"
        />
    </div>
</template>

<script lang="ts" src="./IncCircle.ts"></script>
<style lang="scss" scoped src="./IncCircle.scss"></style>