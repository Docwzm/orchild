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
}
export default ContractService
