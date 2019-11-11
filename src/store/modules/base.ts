
// import request from '@/utils/request';
// import UserService from '@/api/user.service';
import { UserService } from '@/api/index.ts'

var commit: any

const base = {
    state: {
        loginUserInfo: [], // 当前登录用户
        loginUserOrganizations: [], // 当前登录用户所处所有
        loginUserCurrentOrganization: {}, // 当前登录用户
        selectProductId: '', // 选中的金融产品id
        dictionaryData: [] // 数据字典数组
    },
    mutations: {
        setLoginUserInfo: (state: any, loginUserInfo: any) => {
            state.loginUserInfo = loginUserInfo
        },
        setLoginUserOrganizations: (state: any, loginUserOrganizations: any) => {
            state.loginUserOrganizations = loginUserOrganizations
        },
        setLoginUserCurrentOrganization: (state: any, loginUserCurrentOrganization: any) => {
            state.loginUserCurrentOrganization = loginUserCurrentOrganization
        },
        setSelectProductId: (state: any, selectProductId: any) => {
            state.selectProductId = selectProductId
        },
        setDictionaryData: (state: any, dictionaryData: any) => {
            state.dictionaryData = dictionaryData
        }
    },

    actions: {
        // 存储token
        // Token({ commit }, token) {
        //     return new Promise((resolve, reject) => {
        //         setToken(token);
        //         resolve();
        //     })
        // },

        // 获取用户信息
        GetLoginUserInfo(param: any) {
            let { commit, state } = param
            console.log('action:GetLoginUserInfo')
            return new Promise((resolve, reject) => {
                let token = localStorage.getItem('token')

                UserService.getUserInfoByToken({ token }).then((response: any) => {
                    const { data } = response
                    console.log('resData:', data)
                    // 当前登陆人信息
                    if (data.userDetail) {
                        commit('setLoginUserInfo', data.userDetail)
                    }

                    // 机构列表和 当前机构
                    if (data.userReponseDetail && data.userReponseDetail.length > 0) {
                        commit('setLoginUserOrganizations', data.userReponseDetail)
                        let index = data.userReponseDetail.length - 1
                        commit('setLoginUserCurrentOrganization', data.userReponseDetail[index])
                    }
                    resolve()
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 获取数据字典
        getDictionaryData(param: any) {
            let { commit } = param
            return new Promise((resolve, reject) => {
                UserService.getDictionaryData().then((response: any) => {
                    const { data } = response
                    console.log('resData:', data)
                    commit('setDictionaryData', data)
                    resolve()
                }).catch((error: any) => {
                    reject(error)
                })
            })
        }
    },

    getters: {
        loginUserInfo: (state: any) => state.loginUserInfo,
        loginUserOrganizations: (state: any) => state.loginUserOrganizations,
        loginUserCurrentOrganization: (state: any) => state.loginUserCurrentOrganization,
        selectProductId: (state: any) => state.selectProductId,
        getDictionaryListByType: (state: any) => (prop: any) => {
            return state.dictionaryData.filter((item: any) => item.dictType === prop)
        }
    }
}

export default base
