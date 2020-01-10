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
    },
    {
        path: '/creditApplication',
        name: 'creditApplication',
        component: () => import('@/views/Client/CreditApplication/CreditApplication.vue'),
        meta: {
            title: '申请融资',
            navShow:true
        }
    },
    {
        path: '/businessList',
        name: 'businessList',
        component: () => import('@/views/Client/BusinessList/BusinessList.vue'),
        meta: {
            title: '业务记录',
            navShow:true
        }
    },
    {
        path: '/productList',
        name: 'productList',
        component: () => import('@/views/Client/ProductList/ProductList.vue'),
        meta: {
            title: '货物清单',
            navShow:true
        }
    },
    {
        path: '/monitorList',
        name: 'monitorList',
        component: () => import('@/views/Client/MonitorList/MonitorList.vue'),
        meta: {
            title: '监控设备',
            navShow:true
        }
    },
    {
        path: '/enclosure',
        name: 'enclosure',
        component: () => import('@/views/Client/Enclosure/Enclosure.vue'),
        meta: {
            title: '证照资料',
            navShow:true
        }
    },
    {
        path: '/personalInfo',
        name: 'personalInfo',
        component: () => import('@/views/UserCenter/PersonalInfo/PersonalInfo.vue'),
        meta: {
            title: '基本资料',
            navShow:true
        }
    },
    {
        path: '/orgInfo',
        name: 'orgInfo',
        component: () => import('@/views/UserCenter/OrgInfo/OrgInfo.vue'),
        meta: {
            title: '机构信息',
            navShow:true
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/UserCenter/Setting/Setting.vue'),
        meta: {
            title: '设置',
            navShow:true
        }
    },
    {
        path: '/version',
        name: 'version',
        component: () => import('@/views/UserCenter/Version/Version.vue'),
        meta: {
            title: '版本信息',
            navShow:true
        }
    }
]

export default medicRouter
