const categoryRouter = [
    {
        path: '/apply',
        name: 'apply',
        component: () => import('@/views/Category/Apply/Apply.vue'),
        meta: {
            title: '业务申请'
        }
    },
    {
        path: '/loan',
        name: 'loan',
        component: () => import('@/views/Category/Loan/Loan.vue'),
        meta: {
            title: '借款'
        }
    },
    {
        path: '/refound',
        name: 'refound',
        component: () => import('@/views/Category/Refound/Refound.vue'),
        meta: {
            title: '还款'
        }
    }
]

export default categoryRouter
