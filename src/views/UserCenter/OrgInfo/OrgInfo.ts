/**
 * @desc 机构信息
 * @author hqx
 * @time 2019/11/12
 */

import { Component, Vue, Prop } from 'vue-property-decorator'
import { UserCenterService } from '@/api'
import { createDecorator } from 'vue-class-component';

@Component({})
export default class PersonalInfo extends Vue {
    formdata: any = {}
    showPicker = false
    staffSize = false//人员规模
    setDate = false//成立日期
    bussinessTerm = false//营业期限
    industry = false//所属行业

    staffSizeColumns: Array<any> = []
    // setDateColumns = []
    // bussinessTermColumns = []
    industryColumns: Array<any> = []
    staffSizeIndex = 0
    industryIndex = 0

    maxDate = new Date(2050, 1, 1)
    currentDate = new Date()

    currentOrg: any = {}
    termTime = ''
    setDateTime = ''

    created() {
        this.currentOrg = this.$store.state.base.loginUserCurrentOrganization
        this.getDiclist()
        this.getCompanyMemberInfo()
    }

    /** 人员规模*/
    onStaffSizeClick() {
        this.showPicker = true
        this.staffSize = true
    }
    /** 成立日期*/
    onSetDateClick() {
        this.showPicker = true
        this.setDate = true
    }
    /** 营业期限*/
    onBussinessTermClick() {
        this.showPicker = true
        this.bussinessTerm = true
    }
    /** 所属行业*/
    onIndustryClick() {
        this.showPicker = true
        this.industry = true
    }


    /** 规模大小*/
    onstaffSizeConfirm(value: any) {
        this.showPicker = false
        this.staffSize = false
        this.formdata.staffSizeText = value.text
    }
    /** 成立日期*/
    onSetDateConfirm(value: any) {
        this.showPicker = false
        this.setDate = false
        this.formdata.termTime = this.$utils.formatDate(value);
    }
    /** 营业期限*/
    onBussinessTermConfirm(value: any) {
        this.showPicker = false
        this.bussinessTerm = false
        this.formdata.setDateTime = this.$utils.formatDate(value);
    }
    /** 所属行业*/
    onIndustryConfirm(value: any) {
        this.showPicker = false
        this.industry = false
        this.formdata.industryText = value.text
    }

    /**取消 */
    onCancell() {
        this.showPicker = false
        this.staffSize = false//人员规模
        this.setDate = false//成立日期
        this.bussinessTerm = false//营业期限
        this.industry = false//所属行业
    }



    //获取个人基本信息相关数据字典
    getDiclist() {
        let that = this;
        let params = {
            dictCode: "CD9010,CD0013,CD0018,comStaffSize,industry"
        }
        UserCenterService.getDiclist(params).then(res => {
            res.data.comStaffSize.slice().forEach((item: any, index: any) => {
                res.data.comStaffSize[index].text = item.dictValue
            })//规模大小
            res.data.industry.slice().forEach((item: any, index: any) => {
                res.data.industry[index].text = item.dictValue
            })//所属行业
            that.staffSizeColumns = res.data.comStaffSize
            that.industryColumns = res.data.industry
        })
    }

    /**获取机构基本信息 */
    getCompanyMemberInfo() {
        let that = this;
        let params = {
            orgId: this.currentOrg.organizationId
        }
        UserCenterService.getCompanyMemberInfo(params).then(res => {
            that.formdata = res.data;
            if (res.data.memAddress != null) {
                that.formdata.address = res.data.memAddress.address;
                let provinceCName = res.data.memAddress.provinceCName || '';
                let cityCName = res.data.memAddress.cityCName || '';
                let areaCName = res.data.memAddress.areaCName || '';
                that.formdata.region = provinceCName + cityCName + areaCName;
            }
            that.formdata.termTime = that.$utils.formatDate(new Date(res.data.businessTerm));
            that.formdata.setDateTime = that.$utils.formatDate(new Date(parseInt(res.data.foundDate)));
            that.staffSizeColumns.slice().forEach((item: any, index) => {
                if (parseInt(res.data.edu) == parseInt(item.id)) {
                    that.staffSizeIndex = index;
                }
            });
            that.industryColumns.slice().forEach((item: any, index) => {
                if (parseInt(res.data.industry) == parseInt(item.id)) {
                    that.industryIndex = index;
                }
            });
            that.formdata.staffSizeText = that.staffSizeColumns[that.staffSizeIndex].text
            that.formdata.industryText = that.industryColumns[that.industryIndex].text
        })
    }
    onSubmit() {
        let that = this
        if (this.formdata.mailbox == '') {
            return;
        }
        this.$toast.loading({
            duration: 0,
            forbidClick: true,
            // mask: true,
            message: "加载中..."
        })
        UserCenterService.saveCompanyMemberInfo(this.formdata).then(res => {
            that.$toast.clear()
            let _res: any = res
            that.$router.push({
                name: "result", params: {
                    typeName: "checked",//1,操作成功 checked 2 操作失败 warning"
                    content: _res.msg//操作成功可不填,操作失败需要传入msg
                }
            })
        }).catch(error => {
            that.$toast.clear()
            that.$router.push({
                name: "result", params: {
                    typeName: "warning",//1,操作成功 checked 2 操作失败 warning"
                    content: error.message//操作成功可不填,操作失败需要传入msg
                }
            })
        })
    }
}