import { Component, Vue } from 'vue-property-decorator'
import { HomeService } from '@/api'
@Component({})
export default class Enclosure extends Vue {
    fileList = []
    mounted() {
        this.getAttachList()
    }
    /**
     * 获取附件列表
     */
    async getAttachList() {
        let params = {
            memberId: '500288',
            pid: 1
        }
        let { data } = await HomeService.getAttachList(params);
        this.fileList = data;
    }

    async afterRead(files: any, type: any) {
        let that = this;
        var formdata = new FormData();
        formdata.append('file', files.file)
        formdata.append('memberId', '500288');
        formdata.append('organizationId', '0');
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
