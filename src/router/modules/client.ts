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
    },
    {
        path: '/businessList',
        name: 'businessList',
        component: () => import('@/views/Client/BusinessList/BusinessList.vue'),
        meta: {
            title: '业务记录'
        }
    },
    {
        path: '/productList',
        name: 'productList',
        component: () => import('@/views/Client/ProductList/ProductList.vue'),
        meta: {
            title: '货物清单'
        }
    },
    {
        path: '/enclosure',
        name: 'enclosure',
        component: () => import('@/views/Client/Enclosure/Enclosure.vue'),
        meta: {
            title: '证照资料'
        }
    }
]

export default medicRouter
