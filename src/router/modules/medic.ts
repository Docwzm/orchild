const medicRouter = [
    {
        path: '/invoiceList',
        name: 'invoiceList',
        component: () => import('@/views/Medic/InvoiceList/InvoiceList.vue'),
        meta: {
            title: '发票列表',
            navShow:true
        }
    },
    {
        path: '/addInvoice',
        name: 'addInvoice',
        component: () => import('@/views/Medic/AddInvoice/AddInvoice.vue'),
        meta: {
            title: '新增发票',
            navShow:true
        }
    }
]

export default medicRouter
