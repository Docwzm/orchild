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
]

export default ranchRouter
