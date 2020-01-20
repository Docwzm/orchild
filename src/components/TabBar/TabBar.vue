<template>
  <van-tabbar
    v-model="active"
    class="active_tab"
    :safe-area-inset-bottom="true"
    v-bind:class="[$store.getters.isLogin ? 'isShow' : 'isHidden']"
  >
    <van-tabbar-item v-for="(item,index) in tabbars" :key="index" @click="tab(index,item.name)">
      <span :class="currIndex == index ? active:''">{{item.title}}</span>
      <!-- <template slot="icon" slot-scope="props"> -->
      <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal">
      <!-- </template> -->
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts" src="./TabBar.ts"></script>

<style lang="scss" scoped src="./TabBar.scss"></style>
