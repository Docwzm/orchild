import request from '@/utils/request'

class CategoryService {
    static getInvoiceList (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-operator/invoiceManage/list/v1',
            data
        })
    }

}

export default CategoryService
