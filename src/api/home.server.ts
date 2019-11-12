import request from '@/utils/request'

class HomeService {
    static productList(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/product/anloginfile/list/byarea/v1',
            data
        })
    }
    /**
     * 获取当前申请信息 流水号
     * @param data
     */
    static getApplyInfo(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/credit/apply/v1',
            data
        })
    }
    /**
     * 申请融资
     * @param data
     */
    static applyFinancing(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/credit/submit/v1',
            data
        })
    }
    /**
     * 获取附件类型
     * @param data
     */
    static getAttachList(data: any) {
        return request({
            method: 'post',
            url: '/orchid-unify/attach/findSubType/v1',
            data
        })
    }
    /**
     * 获取附件类型
     * @param data
     */
    static uploadFile(data: any) {
        return request({
            method: 'post',
            url: '/orchid-unify/attach/upload/v1',
            data
        })
    }
    /**
     * 获取附件类型
     * @param data
     */
    static deleteFiles(data: any) {
        return request({
            method: 'post',
            url: '/orchid-unify/attach/delete/v1',
            data
        })
    }
}

export default HomeService
