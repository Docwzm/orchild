const contractRouter = [
    {
        path: '/contractSign',
        name: 'contractSign',
        component: () => import('@/views/Contract/ContractSign/ContractSign.vue'),
        meta: {
            title: '合同签署'
        }
    },
    {
        path: '/myContract',
        name: 'myContract',
        component: () => import('@/views/Contract/MyContract/MyContract.vue'),
        meta: {
            title: '我的合同'
        }
    },
    {
        path: '/contractDetail',
        name: 'contractDetail',
        component: () => import('@/views/Contract/ContractDetail/ContractDetail.vue'),
        meta: {
            title: '合同详情'
        }
    }
]

export default contractRouter
