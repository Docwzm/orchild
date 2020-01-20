import { Component, Vue } from 'vue-property-decorator'
import { HomeService } from '@/api'
@Component({})
export default class Enclosure extends Vue {
    fileList: Array<any> = []
    currentOrg: any = {}
    options: any = {}
    mounted() {
        this.options = this.$route.query
        this.currentOrg = this.$store.state.base.loginUserCurrentOrganization
        this.getAttachList()
    }
    /**
     * 获取附件列表
     */
    async getAttachList() {
        let that = this;
        let querys = {
            productId: this.options.productId
            // customerType: this.currentOrg.organizationId ? 1 : 2,    //2对私 1对公
        }
        HomeService.getAttachType(querys).then(res => {
            let _result: any = res;
            let params = {
                pid: 1,
                ...that.currentOrg.organizationId ? { organizationId: that.currentOrg.organizationId } : { memberId: that.currentOrg.memberId }
            }
            HomeService.getAttachList(params).then((__res: any) => {
                let filter = _result.data.map((item: any) => item.code);
                let obj = __res.data.filter((item: any) => filter.includes(item.code));
                // obj.forEach((item: any) => {
                //     item.attachmentList = [];
                // });
                that.fileList = obj

            });

        }).catch(error => {
            that.$toast(error.message)
        })

    }

    async afterRead(files: any, type: any) {
        let that = this;
        var formdata = new FormData();
        formdata.append('file', files.file)
        formdata.append('memberId', this.currentOrg.memberId);
        formdata.append('organizationId', this.currentOrg.organizationId == undefined ? '' : this.currentOrg.organizationId);
        formdata.append('source', '客户端小程序');
        formdata.append('alias', type.name);
        HomeService.uploadFile(formdata).then(res => {
            for (var i = 0; i < that.fileList.length; i++) {
                if (that.fileList[i].code == name) {
                    that.fileList[i].attachmentList.push(res.data[0])
                }
            }
        });
    }

    deleteImg(files: any) {
        let params = {
            id: files.id
        }
        HomeService.deleteFiles(params).then(res => {
            console.log(res)
        })
    }
}
