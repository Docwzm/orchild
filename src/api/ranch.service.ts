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
    //牧场认养存栏列表
    static cattleList(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/ranch/livestock/list/byMember/v1',
            data
        })
    }
}
export default RanchService
