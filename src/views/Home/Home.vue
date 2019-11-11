<template>
  <div class="home">
    <van-skeleton avatar avatar-size="120px" title="" :row="3" :loading="loading">
      <div class="user">
        <div class="weui-cell weui-cell_example">
          <div class="weui-cell__hd">
            <van-image
              round
              width="1.3rem"
              height="1.3rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="weui-cell__bd">
            <p>欢迎您,</p>
          </div>
          <div class="weui-cell__ft">光谷金信</div>
        </div>
      </div>
    </van-skeleton>
    <van-skeleton title="" :row="3" :loading="loading">
      <div class="contians">
        <!-- <div class="org">
          <van-cell
            title="机构"
            value="光谷金信"
            icon="https://pictures.guanggujinxin.com/clientmini/select8.png"
          >
            <van-icon
              slot="right-icon"
              name="https://pictures.guanggujinxin.com/clientmini/xz.png"
              style="line-height: inherit;margin-left:10px;font-size:22px;"
            />
          </van-cell>
        </div>-->
        <Cell
          title="机构"
          value="光谷金信"
          leftIcon="https://pictures.guanggujinxin.com/clientmini/select8.png"
        />
        <div class="product">
          <div class="title">为您推荐服务</div>
          <div class="cardbox">
            <div class="card">
              <img src="https://pictures.guanggujinxin.com/clientmini/poster.png">
              <span @click="approveEvt">立即申请</span>
            </div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>
<style lang="scss" scoped src="./Home.scss"></style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'

@Component({
    components: { Cell }
})
export default class Home extends Vue {
    loading = true
    private created () {
        this.loading = false
    }
    private approveEvt () {
        this.$router.push('/creditApplication')
    }
}
</script>
