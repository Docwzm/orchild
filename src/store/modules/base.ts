
// import request from '@/utils/request';
// import UserService from '@/api/user.service';
import { UserService } from '@/api/index.ts'
import { RoleModel } from "@/model/role.model";
import store from '..';

var commit: any

const base = {
    state: {
        loginUserInfo: null, // 当前登录用户对象
        loginUserOrganizations: null, // 当前登录用户关联所有机构数组，可能包括个人对象
        loginUserCurrentOrganization: null, // 当前登录用户的默认机构
        loginUserOpenId: "",     // 当前登录人的openid
        selectProductId: '', // 选中的金融产品id
        dictionaryData: [], // 数据字典数组
        tabBarActiveIndex: 0,//tabbar索引
        pageParams: {},//页面参数暂存容器
        transitionName: '',//页面切换效果
        navBarTitle:'',//navbar标题
        navBarShow:false,//navbar显示
        personalCentreInfo: {},//用户基础信息以及其他    
        businessActiveIndex: "", //业务场景
        productActiveIndex: 0, //金融产品索引
        loanNo: '',
        contractId:''//合同id
    },
    mutations: {
        setLoanNo(state: any, loanNo: any) {
            state.loanNo = loanNo
        },
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
        setLoginUserOpenId: (state: any, openId: any) => {
            state.loginUserOpenId = openId
        },
        /**
         * 设置动画效果
         */
        setTransitionName:(state: any, value: any) => {
            state.transitionName = value
        },
        /**
         * 设置navbar标题
         */
        setNavBarTitle:(state: any, value: any) => {
            state.navBarTitle = value
        },
        /**
         * 设置navbar是否显示
         */
        setNavBarShow:(state: any, value: any) => {
            state.navBarShow = value
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
         * 业务首页区分业务场景  // -100-没有业务 1-有业务 2-审核中   0 授信失败   1 授信成功   先判断result后判断status   没有result 后判断status
         */
        setBusinessActiveIndex: (state: any, value: any) => {
            state.businessActiveIndex = value
        },
        /**
         * 金融产品索引
         */
        setProductActiveIndex: (state: any, value: any) => {
            state.productActiveIndex = value
        },
        /**
         * 合同id
         */
        setContractId: (state: any, value: any) => {
            state.contractId = value
        },
        /**通用更新state内字段值方法 */
        changeState(state: any, obj: any) {
            state[obj.key] = obj;
        },
        /**
         *
         * @param state 清空存储的所有信息
         */
        resetData(state: any) {
            state["loginUserInfo"] = null // 当前登录用户对象
            state["loginUserOrganizations"] = null // 当前登录用户关联所有机构数组，可能包括个人对象
            state["loginUserCurrentOrganization"] = null // 当前登录用户的默认机构
            state["selectProductId"] = '' // 选中的金融产品id
            state["dictionaryData"] = [] // 数据字典数组
            state["tabBarActiveIndex"] = 0 //tabbar索引
            state["pageParams"] = {} //页面参数暂存容器
            state["transitionName"] = '' //页面切换效果
            state["personalCentreInfo"] = {} //用户基础信息以及其他
            state["isLogin"] = false //是否登录
            state["businessActiveIndex"] = '' //业务首页区分业务场景
            state["loanNo"] = ''  //借据号
        }
    },

    actions: {

        // 根据token获取用户信息
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

        // 根据openId获取用户信息
        GetLoginUserInfoByOpenId(key: any, params: any, ) {
            let { commit, state } = key
            console.log('action:GetLoginUserInfoByOpenId：', params)
            return new Promise((resolve, reject) => {
                let token = localStorage.getItem('token')

                UserService.loginV2(params).then((response: any) => {
                    const { data } = response
                    console.log('resData:', data)

                    // token
                    if (data.token) {
                        localStorage.setItem("token", data.token.toString())
                    }
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
        loginUserOpenId: (state: any) => state.loginUserOpenId,
        isLogin: (state: any) => state.loginUserInfo ? true : false,
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
