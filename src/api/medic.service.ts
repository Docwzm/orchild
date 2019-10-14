import request from '@/utils/request'

class MedicService {
    static getInvoiceList (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-operator/invoiceManage/list/v1',
            data
        })
    }

    static createInvoice (data: any) {
        return request({
            method: 'post',
            url: 'orchid-web-operator/forward?uri=/invoice/add/v1&service=invoice',
            data
        })
    }
}

export default MedicService
