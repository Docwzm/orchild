// 格式化金额格式
export function formatInvoiceStatus(val) {
    if (val === 1) {
        return "待验证";
    } else if (val === 2) {
        return "有效";
    } else if (val === 3) {
        return "无效"
    }else{
        return "过期";
    }
}

export function formatGender(val) {
    if (val == 0) {
        return "母";
    } else {
        return "公"
    }
}