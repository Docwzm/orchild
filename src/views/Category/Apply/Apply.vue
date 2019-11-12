<template>
    <div class="apply">
        <div class="bg"></div>
        <div class="header">
            <div class="header-top">
                <div class="left">满意测试</div>
                <div class="right">静态质押</div>
            </div>
            <div class="header-main">
                <div class="main-top">
                    <div class="left">
                        <JXCircle
                        :rate="40"
                        :speed="100"
                        :text="text"
                        :strokeWidth="298"
                        :color="gradientColor"
                        layer-color="#F3F3F3"
                        size="260px"
                    ></JXCircle>
                    </div>
                    <div class="right">
                        <div class="cell">金蒜盘存货融资</div>
                        <div class="cell">待还金额(元)<span class="cell-price">74,346.17</span></div>
                        <div class="cell">在库货值(元)<span class="cell-price">74,346.17</span></div>
                        <div class="cell">担保货值(元)<span class="cell-price">74,346.17</span></div>
                    </div>
                </div>
                <div class="main-bottom">
                    <div>库存统计时间:2019/11/11 12:30:00</div>
                </div>
            </div>
            <div class="icon">
                <div class="left">
                    <img src="@/assets/category/icon/loan.png" alt="">
                    <p>借款</p>
                </div>
                <div class="right">
                    <img src="@/assets/category/icon/refund.png" alt="">
                    <p>还款</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script type="ts" src="./Apply.ts"></script>
<style lang="scss" scoped>
.apply {
    height: 100vh;
    background: #F3F3F3;
    .bg {
        height: 400px;
         background: linear-gradient(#151a33, #3b4255);
        position:fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .header {
        position: absolute;
        z-index: 999;
        color: #fff;
        background: none;
        left: 10%;
        right: 10%;
        top: 40px;
        .icon {
            margin-top: 35px;
            height: 300px;
            width: 100%;
            display: flex;
            color: #000;
            font-size: 30px;
            text-align: center;
            .left,.right {
                padding-top: 30px;
                box-sizing: border-box;
                width: 200px;
                height: 200px;
                border-radius: 5px;
                background: #fff;
                margin-right: 15px;
            }
        }
        .header-top {
            font-size: 30px;
            font-weight: 600;
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
        }
        .header-main {
            border-radius: 5px;
            color: #000;
            margin-top: 20px;
            height: 400px;
            background: #fefefe;
            padding: 10px;
            box-sizing: border-box;
            .main-top {
                height: 60%;
                display: flex;
                justify-content: space-between;
                .left {
                    width: 300px;
                }
                .right {
                    display: flex;
                    flex-direction: column;
                    margin-right: 10px;
                    .cell:nth-of-type(1) {
                        font-weight: 700;
                        font-size: 27px;
                        margin-top: 35px;
                        margin-bottom: 10px;
                    }
                    .cell {
                        margin-top: 20px;
                        height: 20%;
                        text-align: left;
                        .cell-price {
                            font-weight: 800;
                            padding-left: 5px;
                        }
                    }
                }
            }
            .main-bottom {
                margin-top: 50px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 30px;
                color: #C5C2C8;
            }
        }
    }

}
</style>