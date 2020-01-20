<template>
    <div class="monitorList">
        <!-- 仓库选择 -->
        <Cell
            title="仓库选择"
            rightIcon="bars"
            :defaultValue="businessDataText"
            :columns="columnsData"
            @onChange="onChange"
        />
        <!-- 列表 -->
        <div class="item" v-for="item in list" :key="item.id">
            <div class="item-title flex">
                <i class="iconfont icon-shexiangtou"></i>
                <div>{{item.name}}</div>
            </div>
            <div class="item-center flex">
                <div class="left flex">
                    <div class="num flex">
                        <div class="value">{{item.no}}</div>
                        <div class="label">设备编号</div>
                    </div>
                    <div class="online flex">
                        <div class="value">
                            <i class="iconfont icon-xinhao"></i>
                        </div>
                        <div class="label">{{item.isOnline == 1 ? '在线' : '不在线'}}</div>
                    </div>
                </div>
                <div class="picture"></div>
            </div>
            <div class="item-footer flex">
                <div class="lookMonitor flex" @click="openVideo(item)">查看监控</div>
            </div>
        </div>
        <div class="modal-mask" @click="closeVideo" v-if="showVideo">
            <div class="video">
                <video
                    id="myVideo"
                    class="video-js vjs-default-skin vjs-big-play-centered"
                    height="600"
                    width="700"
                    preload="auto"
                    controls
                    data-setup="{}"
                    @loadstart="loadstart"
                >
                    <source id="source" :src="videoSrc" type="application/x-mpegURL">
                </video>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./MonitorList.ts"></script>
<style lang="scss"  src="./MonitorList.scss" ></style>
