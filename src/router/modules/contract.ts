const contractRouter = [
    {
        path: '/contractSign',
        name: 'contractSign',
        component: () => import('@/views/Contract/ContractSign/ContractSign.vue'),
        meta: {
            title: '合同签署'
        }
    }
]

export default contractRouter
