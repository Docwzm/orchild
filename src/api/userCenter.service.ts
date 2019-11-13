import request from '@/utils/request'

class UserCenterService {
    /**获取教育程度,职业类型字典 */
    static getDiclist(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/dictionary/list',
            data
        })
    }
    /**单独获取从事行业 */
    static getIndustryDic(data: any) {
        return request({
            method: 'post',
            url: '/orchid-unify/dict/list/industry/types/v1',
            data
        })
    }
    /**个人中心获取基本信息 */
    static getPersonalMemberInfo(params: any) {
        return request({
            method: 'get',
            url: '/orchid-web-customer/user/getPersonalMemberInfo',
            params
        })
    }
    /**保存个人基本信息 */
    static saveBaseInfo(data: any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/user/savePersonalMemberInfo',
            data
        })
    }

}

export default UserCenterService
