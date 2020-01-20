import request from '@/utils/request'

class RanchService {
    //牧场展示列表
    static loadRanchList(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/ranch/list/byMember/v1',
            data
        })
    }
    //牧场详情 牛体重区间数据进度
    static categoryCattle(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/ranch/member/statistic/v1',
            data
        })
    }
    //牧场认养存栏列表
    static cattleList(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/ranch/livestock/list/byMember/v1',
            data
        })
    }
    //牧场借款信息
    static debtInfo(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/ranch/livestock/member/debt/v1',
            data
        })
    }
    //牧场借款信息提交
    static submitDebtInfo(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/ranch/livestock/member/applyLoan/v1',
            data
        })
    }

}
export default RanchService
