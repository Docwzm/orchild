import request from '@/utils/request'

class CategoryService {
    static getInvoiceList (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-operator/invoiceManage/list/v1',
            data
        })
    }
    //监控设备列表接口
    static cameraList (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-customer/warehouse/camera/list/v1',
            data
        })
    }
    //业务记录列表接口
    static bussessList (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-customer/pledge/member/record/list/v1',
            data
        })
    }
    //货物清单树
    static inventoryTree (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-customer/forward?uri=/choose/plan/inventory/tree/v1&service=workflow-form',
            data
        })
    }
    //货物清单列表
    static inventoryList (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-customer/forward?uri=/choose/plan/inventory/list/v1&service=workflow-form',
            data
        })
    }

    // 获取信用信息
    static getCreditInfo(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/credit/list/v1',
            data
        })
    }

    // 获取个人信息
    static getPersonalInfo(params:any) {//orgId:any, appName:any
        return request({
            method: 'get',
            url: '/orchid-web-customer/user/personalCentreInfo',
            params
        })
    }
}
export default CategoryService
