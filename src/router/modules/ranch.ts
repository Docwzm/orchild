const ranchRouter = [
    {
        path: '/ranchDetail',
        name: 'ranchDetail',
        component: () => import('@/views/Client/Ranch/RanchDetail/RanchDetail.vue'),
        meta: {
            title: '牧场详情',
            navShow:true
        }
    },
    {
        path: '/cattleList',
        name: 'cattleList',
        component: () => import('@/views/Client/Ranch/CattleList/CattleList.vue'),
        meta: {
            title: '认养列表',
            navShow:true
        } 
    },
    {
        path: '/cattleDetail',
        name: 'cattleDetail',
        component: () => import('@/views/Client/Ranch/CattleDetail/CattleDetail.vue'),
        meta: {
            title: '活体详情',
            navShow:true
        } 
    }
]

export default ranchRouter
