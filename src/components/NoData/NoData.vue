<template>
    <view class="nodata" >
        <view class="no">
            <image mode="widthFix" src="./icon/nodata.png"></image>
            <view class="tip-text">您当前没有业务</view>
            <view class="btn apply-btn confirmBtn" bindtap="jumpPage">立即申请</view>
            <view class="btn history" bindtap="lookLog">查看历史业务</view>
        </view>
    </view>
</template>
<script>
createComponent({
	data: {
		status: 1, // 0-没有业务 1-审核中 2-有业务
	},
	methods: {
		jumpPage(){
            wx.switchTab({ url:'/pages/home/index'})
        },
        lookLog() {
			this.__app.data.__loglistdata={}
			wx.navigateTo({
				url: '/userBusiness/log/log'
			})
		},
	},
});
</script>

<style lang="scss" scoped>
@import "@var";
.nodata{
    height: 100%;
	background-color: #fff;
	.no{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: calc(100% - 80rpx);
        image{
            width: 240rpx;
        }
		.tip-text{
            font-size: 32rpx;
            margin-top: 42rpx;
            margin-bottom: 46rpx;
            // font-weight: bold;
        }
        .btn{
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            width: 100%;
            font-size: 28rpx;
            width: 594rpx;
            height: 84rpx;
            margin-bottom: 18rpx;
        }
		.apply-btn{
            // color: $themeBlue;
            background: linear-gradient(to right, #c3a98b, #aa9173, #8d7456);
            color: #ffffff;
        }
        .history{
           border: 1rpx solid #c6ab8c;
           color: #c6ab8c;
        }
	}
}
</style>

