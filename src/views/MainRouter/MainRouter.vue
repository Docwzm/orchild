<template>
  <div>
    <transition :name="$store.state.base.transitionName">
        <router-view/>
    </transition>

    <!-- <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition> -->
    <TabBar/>
  </div>
</template>

<script lang="ts" src="./MainRouter.ts"></script>

<style lang="scss">
//页面跳转动画样式
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s ease;
  position: absolute;
  right: 0;
  left: 0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100px, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100px, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100px, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100px, 0, 0);
}
</style>
