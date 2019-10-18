import Vue from 'vue'

// 全局混入
Vue.mixin({
    methods: {
        storeBusinessInfo () {
            return new Promise((resolve, reject) => {
                // let token = localStorage.getItem("token");

                let token:(string | (string | null)[]) = this.$route.query.token
                console.log('token123:', this.$route.query.token)
                // 获取用户信息
                if (token && token !== '') {
                    localStorage.setItem('token', token.toString())
                    // 取用户相关信息
                    this.$store.dispatch('GetLoginUserInfo').then(() => {
                        console.log('123')
                        resolve()
                    })

                    // 取数据字典
                    this.$store.dispatch('getDictionaryData')
                }

                // 当前选中金融产品Id
                let selectProductId = this.$route.query.selectProductId
                if (selectProductId && selectProductId !== '') {
                    this.$store.commit('setSelectProductId', selectProductId)
                }
            })
        }
    }
})
