// 格式化金额格式
function formatInvoiceStatus (val:any) {
    if (val === 1) {
        return '待验证'
    } else if (val === 2) {
        return '有效'
    } else if (val === 3) {
        return '无效'
    } else {
        return '过期'
    }
}

function formatGender (val:any) {
    if (val === 0) {
        return '母'
    } else {
        return '公'
    }
}

const filterobj : { [key: string]: any } = {
    formatInvoiceStatus,
    formatGender
}

export default filterobj
