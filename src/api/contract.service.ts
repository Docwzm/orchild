import request from '@/utils/request'

class ContractService {
    /**
     * 已办合同列表
     * @param data 
     */
    static signedContractList(data:any) {
        return request({
            method: 'post',
            url: '/orchid-contract/contract/groupByTemplate/v1',
            data
        })
    }
    /**
     * 待签合同列表
     * @param data  
     */
    static upComingContractList(data:any) {
        return request({
            method: 'post',
            url: '/orchid-contract/contract/list/v1',
            data
        })
    }

    /**###############合同签署页相关接口API################# */
    /**
     * 获取最新印章
     * @param data 
     */
    static getCompSignature(data:any) {
        return request({
            method: 'post',
            url: '/orchid-web-customer/user/memCertified/getCompSignature/v1',
            data
        })
    }
    /**
     * 获取合同签署历史信息
     * @param data 
     */
    static getContractLog(data:any) {
        return request({
            method: 'post',
            url: '/orchid-contract/contract/log/v1',
            data
        })
    }
    /**
     * 获取合同详情
     * @param data 
     */
    static contractDetail(data:any) {
        return request({
            method: 'post',
            url: '/orchid-contract/contract/detail/v1',
            data
        })
    }

    /**
     * 检查验证码接口
     * @param data 
     */
    static contractCheckMsg(data:any) {
        return request({
            method: 'post',
            url: '/orchid-contract/contract/checkMsg/v1',
            data
        })
    }

    /**
     * 验证码验证通过 调用签署接口
     * @param data 
     */
    static contractSign(data:any) {
        return request({
            method: 'post',
            url: '/orchid-contract/contract/sign/v1',
            data
        })
    }

    /**
     * 发送验证码
     * @param data 
     */
    static sendVerCode(data:any) {
        return request({
            method: 'post',
            url: '/orchid-contract/contract/sendMsg/v1',
            data
        })
    }


}
export default ContractService
