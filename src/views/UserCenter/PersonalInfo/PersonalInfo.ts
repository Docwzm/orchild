/**
 * @desc 基本信息
 * @author hqx
 * @time 2019/11/12
 */

import { Component, Vue, Prop } from 'vue-property-decorator'
import { UserCenterService } from '@/api'

@Component({})
export default class PersonalInfo extends Vue {
    showPicker = false
    formdata: any = {}//表单数据
    eduColumns: Array<any> = []//教育程度列表
    industryColumns: Array<any> = []//从事行业
    professionColumns: Array<any> = []//职业类型
    edu = false
    industry = false
    job = false
    eduIndex = 0
    industryIndex = 0
    professionIndex = 0
    currentOrg: any = {}
    /**教育程度 */
    onEduConfirm(value: any) {
        console.log(value)
        this.showPicker = false
        this.edu = false
        this.eduColumns.slice().forEach((item: any, index) => {
            if (parseInt(value.id) == parseInt(item.id)) {
                this.eduIndex = index;
            }
        });
        this.formdata.edu = this.eduColumns[this.eduIndex].id;
        this.formdata.eduTetx = this.eduColumns[this.eduIndex].text
    }
    /**从事行业 */
    onIndustryConfirm(value: any) {
        this.showPicker = false
        this.industry = false
        this.industryColumns.slice().forEach((item: any, index) => {
            if (parseInt(value.id) == parseInt(item.id)) {
                this.industryIndex = index;
            }
        });
        this.formdata.industry = this.industryColumns[this.industryIndex].id;
        this.formdata.industryText = this.industryColumns[this.industryIndex].text
    }
    /**职业类型 */
    onProfessionConfirm(value: any) {
        this.showPicker = false
        this.job = false
        this.professionColumns.slice().forEach((item: any, index) => {
            if (parseInt(value.id) == parseInt(item.id)) {
                this.professionIndex = index;
            }
        });
        this.formdata.job = this.professionColumns[this.professionIndex].id;
        this.formdata.jobText = this.professionColumns[this.professionIndex].text
    }

    onEduClick() {
        this.showPicker = true
        this.edu = true
    }
    onIndustryClick() {
        this.showPicker = true
        this.industry = true
    }
    onProfessionClick() {
        this.showPicker = true
        this.job = true
    }
    onCancell() {
        this.showPicker = false
        this.job = false
        this.industry = false
        this.edu = false
    }
    created() {
        this.currentOrg = this.$store.state.base.loginUserCurrentOrganization
        this.getPersonalMemberInfo()
        this.getDiclist()
        this.getIndustryDic()
    }

    //获取个人基本信息相关数据字典
    getDiclist() {
        let that = this;
        let params = {
            dictCode: "CD9010,CD0013,CD0018,comStaffSize,industry"
        }
        UserCenterService.getDiclist(params).then(res => {
            res.data.CD9010.slice().forEach((item: any, index: any) => {
                res.data.CD9010[index].text = item.dictValue
            })//教育程度
            res.data.CD0013.slice().forEach((item: any, index: any) => {
                res.data.CD0013[index].text = item.dictValue
            })//职业类型
            that.eduColumns = res.data.CD9010
            that.professionColumns = res.data.CD0013
        })
    }

    /**单独获取从事行业字典 */
    getIndustryDic() {
        let that = this;
        let params = {
            pid: 0
        }
        UserCenterService.getIndustryDic(params).then(res => {
            res.data.slice().forEach((item: any, index: any) => {
                res.data[index].text = item.nodeName
            })//从事行业
            that.industryColumns = res.data
        })
    }
    /**获取个人中心基本信息 */
    getPersonalMemberInfo() {
        let that = this;
        let params = {
            memberId: this.currentOrg.memberId
        }
        UserCenterService.getPersonalMemberInfo(params).then(res => {
            that.formdata = res.data;
            if (res.data.memAddress != null) {
                that.formdata.address = res.data.memAddress.address;
                let provinceCName = res.data.memAddress.provinceCName || '';
                let cityCName = res.data.memAddress.cityCName || '';
                let areaCName = res.data.memAddress.areaCName || '';
                that.formdata.region = provinceCName + cityCName + areaCName;
            }
            that.eduColumns.slice().forEach((item: any, index) => {
                if (parseInt(res.data.edu) == parseInt(item.id)) {
                    that.eduIndex = index;
                }
            });
            that.industryColumns.slice().forEach((item: any, index) => {
                if (parseInt(res.data.industry) == parseInt(item.id)) {
                    that.industryIndex = index;
                }
            });
            that.professionColumns.slice().forEach((item: any, index) => {
                if (parseInt(res.data.job) == parseInt(item.id)) {
                    that.professionIndex = index;
                }
            });
            that.formdata.eduText = that.eduColumns[that.eduIndex].text
            that.formdata.industryText = that.industryColumns[that.industryIndex].text
            that.formdata.jobText = that.professionColumns[that.professionIndex].text
        })
    }
    onSubmit() {
        let that = this;
        if (this.formdata.email == '') {
            return;
        }
        this.$toast.loading({
            duration: 0,
            forbidClick: true,
            // mask: true,
            message: "加载中..."
        })
        UserCenterService.saveBaseInfo(this.formdata).then(res => {
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
                name: 'result',
                params: {
                    typeName: "warning",//1,操作成功 checked 2 操作失败 warning"
                    content: error.message//操作成功可不填,操作失败需要传入msg
                }
            })
        })
    }
}
