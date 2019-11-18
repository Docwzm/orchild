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
        path: '/refund',
        name: 'refund',
        component: () => import('@/views/Category/Refund/Refund.vue'),
        meta: {
            title: '还款'
        }
    },
    {
        path: '/loanList',
        name: 'loanList',
        component: () => import('@/views/Category/LoanList/LoanList.vue'),
        meta: {
            title: '借款列表'
        }
    }
]

export default categoryRouter
