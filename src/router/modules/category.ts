const categoryRouter = [
    {
        path: '/apply',
        name: 'apply',
        component: () => import('@/views/Category/Apply/Apply.vue'),
        meta: {
            title: '业务申请'
        }
    }
]

export default categoryRouter
