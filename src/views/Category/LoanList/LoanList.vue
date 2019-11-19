<template>
    <div class="loan-list" v-if="dataList">
        <div class="list-item" v-for="(item,index) in dataList" :key="index">
            <div class="check" @click="checkedHandle(index)">
                <div class="checkd" v-if="checkedIndex == index">
                    <img src="@/assets/category/icon/checked.png" alt="">
                </div>
                <div class="null" v-else>
                </div>
            </div>
            <div class="content">
                <div class="no">{{item.loanNo}}</div>
                <div class="item">{{item.loanBeginDate}}至{{item.expireTime}}</div>
                <div class="principal">
                    <div>待还本金（元）</div>
                    <div class="money">￥{{item.loanBalance}}</div>
                </div>
            </div>
            <div class="icon">
                <img v-if="item.status==0" src="@/assets/category/icon/yc.png" alt="">
                <img v-if="item.status==1" src="@/assets/category/icon/zc.png" alt="">
            </div>
        </div>

        <div class="bottom">
      <div class="button">
        <p @click="submit">提交</p>
      </div>
    </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { CategoryService } from "@/api"


@Component({
})
export default class LoanList extends Vue {
    dataList: any = []
    checkedIndex: number = 0
    created() {
        console.log(this.$route);

        this.getNoLoanData();
    }

    getNoLoanData () {

        let params  = {
            businessNo: this.$route.query.businessNo,
            warehouseId: this.$route.query.warehouseId ? this.$route.query.warehouseId :  ''
        }
        console.log("~~~",params);

        CategoryService.borrowList(params)
        .then((res:any)=>{
            console.log(res);
            if (res.code === 200) {
                this.dataList = res.data;
                const index = this.dataList.findIndex( (item: any) => item.loanNo  === this.$route.query.receiptNo )
                this.checkedIndex = index === -1 ? 0 : index;
            }
        })
    }

    checkedHandle (index: number) {
        this.checkedIndex = index;
        console.log(index);

    }

    submit() {
       let receiptNo = this.dataList[this.checkedIndex].loanNo;
       this.$store.commit('setLoanNo',receiptNo);
       this.$router.push("/refund");
    }

}

</script>

<style lang="scss" scoped src="./LoanList.scss"></style>