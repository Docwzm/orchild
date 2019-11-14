
// import request from '@/utils/request';
// import UserService from '@/api/user.service';
import { UserService } from '@/api/index.ts'
import { RoleModel } from "@/model/role.model";
import store from '..';

var commit: any

const base = {
    state: {
        loginUserInfo: [], // 当前登录用户对象
        loginUserOrganizations: [], // 当前登录用户关联所有机构数组，可能包括个人对象
        loginUserCurrentOrganization: {}, // 当前登录用户的默认机构
        selectProductId: '', // 选中的金融产品id
        dictionaryData: [], // 数据字典数组
        tabBarActiveIndex: 0,//tabbar索引
        pageParams: {},//页面参数暂存容器
        transitionName: '',//页面切换效果
        personalCentreInfo: {},//用户基础信息以及其他
        isLogin: false//是否登录
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
        },
        /**
         * 设置tabbar激活索引
         */
        setTabBarActiveIndex: (state: any, index: any) => {
            state.tabBarActiveIndex = index
        },
        /**
         * 用户基础信息以及其他
         */
        setPersonalCentreInfo: (state: any, value: any) => {
            state.personalCentreInfo = value
        },
        /**
         * 全局存储orgid
         */
        setIsLogin: (state: any, value: any) => {
            state.isLogin = value
        },
        /**通用更新state内字段值方法 */
        changeState(state: any, obj: any) {
            state[obj.key] = obj;
        },
        resetData(state: any) {
            state["loginUserInfo"] = [] // 当前登录用户对象
            state["loginUserOrganizations"] = [] // 当前登录用户关联所有机构数组，可能包括个人对象
            state["loginUserCurrentOrganization"] = {} // 当前登录用户的默认机构
            state["selectProductId"] = '' // 选中的金融产品id
            state["dictionaryData"] = [] // 数据字典数组
            state["tabBarActiveIndex"] = 0//tabbar索引
            state["pageParams"] = {}//页面参数暂存容器
            state["transitionName"] = ''//页面切换效果
            state["personalCentreInfo"] = {}//用户基础信息以及其他
            state["isLogin"] = false//是否登录
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
        },

        /**获取用户基础信息 */
        getPersonalCentreInfo(key: any, params: any, ) {
            let { commit } = key
            return new Promise((resolve, reject) => {
                UserService.getPersonalCentreInfo(params).then((res: any) => {
                    const { data } = res
                    commit('setPersonalCentreInfo', data)
                    resolve()
                }).catch((error: any) => {
                    reject(error)
                })
            })
        }
    },

    getters: {
        loginUserInfo: (state: any): RoleModel => state.loginUserInfo,
        loginUserOrganizations: (state: any): Array<RoleModel> => state.loginUserOrganizations,
        loginUserCurrentOrganization: (state: any): RoleModel => state.loginUserCurrentOrganization,
        selectProductId: (state: any) => state.selectProductId,
        getDictionaryListByType: (state: any) => (prop: any): Array<{ id: number, dictValue: string }> => {
            return state.dictionaryData.filter((item: any) => item.dictType === prop)
        }
    }
}

export default base
