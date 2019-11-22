import Vue from 'vue'

// 全局混入
Vue.mixin({
    methods: {
        storeLoginUserInfo() {
            return new Promise((resolve, reject) => {                

                let token: (string | (string | null)[]) = this.$route.query.token                
                // 根据token获取用户信息
                if (token && token !== '') {
                    localStorage.setItem('token', token.toString())
                    // 取用户相关信息
                    this.$store.dispatch('GetLoginUserInfo').then(() => {                        
                        resolve()
                    })

                    // 取数据字典
                    this.$store.dispatch('getDictionaryData')
                }

                // 根据openId获取用户信息
                if (this.$route.query.openId) {
                    const openId = this.$route.query.openId                   
                    this.$store.commit('setLoginUserOpenId', openId)                    
                    // 取用户相关信息
                    this.$store.dispatch('GetLoginUserInfoByOpenId', { openId: openId,type:3 }).then(() => {                        
                        // 取数据字典
                        this.$store.dispatch('getDictionaryData')
                        resolve()
                    })
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
