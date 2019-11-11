const medicRouter = [
    {
        path: '/invoiceList',
        name: 'invoiceList',
        component: () => import('@/views/Medic/InvoiceList/InvoiceList.vue'),
        meta: {
            title: '发票列表'
        }
    },
    {
        path: '/addInvoice',
        name: 'addInvoice',
        component: () => import('@/views/Medic/AddInvoice/AddInvoice.vue'),
        meta: {
            title: '新增发票'
        }
    },
    {
        path: '/creditApplication',
        name: 'creditApplication',
        component: () => import('@/views/Client/CreditApplication/CreditApplication.vue'),
        meta: {
            title: '申请融资'
        }
    }
]

export default medicRouter
