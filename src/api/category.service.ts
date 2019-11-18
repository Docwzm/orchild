import request from '@/utils/request'

class CategoryService {
    static getInvoiceList(data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-operator/invoiceManage/list/v1',
            data
        })
    }
    /** 仓库列表 */
    static warehouseList(data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-customer/pledge/member/warehouse/profile/list/v1',
            data
        })
    }
    //监控设备列表接口
    static cameraList(params: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/warehouse/camera/list/v1',
            params
        })
    }
    //业务记录列表接口
    static businessList(params: any) {
        return request({
            method: 'post',
            url: 'orchid-web-customer/pledge/member/record/list/v1',
            params
        })
    }
    //货物清单树
    static inventoryTree(data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-customer/forward?uri=/choose/plan/inventory/tree/v1&service=workflow-form',
            data
        })
    }
    //货物清单列表
    static inventoryList(data: any) {
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
    static getPersonalInfo(params: any) {//orgId:any, appName:any
        return request({
            method: 'get',
            url: '/orchid-web-customer/user/personalCentreInfo',
            params
        })
    }

    //根据流水号获取仓库数据
    static getWarehouseInfo(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/pledge/member/warehouse/profile/list/v1',
            data
        })
    }

    /**
     *
     * @param data 获取是否存在借据
     */
    static isLoanNo(params: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/pledge/warehouse/debtdetail/v1',
            params
        })
    }
    /**
     *
     * @param data 获取是否存在借据
     */
    static loadApply(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/pledge/warehouse/loan/v1',
            data
        })
    }
    /**
     * 借款信息展示
     * @param data 获取是否存在借据
     */
    static loanInfoShow(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/pledge/warehouse/profile/v1',
            data
        })
    }


    /**
    * 提交还款
    * @param data 
    */
    static earlyRepay(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/pledge/warehouse/repay/v1',
            data
        })
    }
}
export default CategoryService
