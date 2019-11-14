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
            <p v-if="$store.state.base.isLogin">欢迎您,</p>
            <p @click="rightLogin" v-else style="clolor:#c5ab8d">立即登录</p>
          </div>
          <div class="weui-cell__ft">{{userDataList.memberName}}</div>
        </div>
      </div>
    </van-skeleton>
    <van-skeleton title="" :row="3" :loading="loading">
      <div class="contians">
        <Cell
          :columns="columnsData"
          @onChange="onChange"
          title="机构"
          :value="organizationName"
          leftIcon="https://pictures.guanggujinxin.com/clientmini/select8.png"
        />
        <div class="product">
          <div class="title">为您推荐服务</div>
          <div class="cardbox">
            <div class="card" v-for="item in productList" :key="item.id" :title="item">
              <img :src="item.publicityPhotos">
              <span @click="approveEvt(item)">立即申请</span>
            </div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>
<style lang="scss" scoped src="./Home.scss"></style>
<script lang="ts" src="./Home.ts"></script>
