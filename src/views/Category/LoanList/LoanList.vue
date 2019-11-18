<template>
    <div class="loan-list">
        <div class="list-item">
            <div class="check">
                <!-- <div class="checkd">
                    <img src="@/assets/category/icon/checked.png" alt="">
                </div> -->
                <div class="null">
                </div>
            </div>
            <div class="content">
                <div class="no">JJ9527</div>
                <div class="item">2019/07/25至2019/07/25</div>
                <div class="principal">
                    <div>待还本金（元）</div>
                    <div class="money">￥6446.17</div>
                </div>
            </div>
            <div class="icon">
                <img src="@/assets/category/icon/yc.png" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'



export default class LoanList extends Vue {
}

</script>

<style lang="scss" scoped src="./LoanList.scss"></style>