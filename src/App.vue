<template>
  <div id="app">
     <NavBar/>
    <transition :name="$store.state.base.transitionName">
      <router-view/>
    </transition>
    <!-- <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition> -->
    <!-- <transition :name="transitionName"> -->
      <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import NavBar from './components/NavBar/NavBar.vue'

@Component({
    components: {
        NavBar
    }
})
export default class App extends Vue {
    transitionName = ""
    created() {
        let token = this.$route.query.token
        console.log(this.$route.query.token)
        console.log("load:", token)
    }
    mounted() {
        let token = this.$route.query.token
        console.log(this.$route.query.token)
        console.log("load:", token)
    }
    /** 监听路由 */
    @Watch("$route")
    routechange(to: any, from: any) {
        const toDepth = to.path.split("/").length
        const fromDepth = from.path.split("/").length
        this.transitionName = toDepth < fromDepth ? "slide-left" : "slide-right"
        this.$store.commit('setTransitionName', this.transitionName)
        this.$store.commit('setNavBarTitle', to.meta.title)
        this.$store.commit('setNavBarShow', to.meta.navShow)
    }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.van-toast {
  width: 150px !important;
  // opacity: 0.7;
}
.van-loading__spinner {
  width: 75px !important;
  height: 75px !important;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

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
