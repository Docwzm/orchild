
// import request from '@/utils/request';
// import UserService from '@/api/user.service';
import {UserService} from '@/api/index.ts'

const base = {
    state: {
        loginUserInfo: [], //当前登录用户
        loginUserOrganizations: [],   // 当前登录用户所处所有
        loginUserCurrentOrganization: {},     // 当前登录用户
        selectProductId:"",     // 选中的金融产品id
        dictionaryData:[]   // 数据字典数组
    },
    mutations: {
        setLoginUserInfo: (state, loginUserInfo) => {
            state.loginUserInfo = loginUserInfo;
        },
        setLoginUserOrganizations: (state, loginUserOrganizations) => {
            state.loginUserOrganizations = loginUserOrganizations;
        },
        setLoginUserCurrentOrganization: (state, loginUserCurrentOrganization) => {
            state.loginUserCurrentOrganization = loginUserCurrentOrganization;
        },
        setSelectProductId:(state, selectProductId) => {
            state.selectProductId = selectProductId;
        },
        setDictionaryData:(state, dictionaryData) => {
            state.dictionaryData = dictionaryData;
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
        GetLoginUserInfo({ commit, state }) {
            console.log("action:GetLoginUserInfo")
            return new Promise((resolve, reject) => {
                let token = localStorage.getItem("token");

                UserService.getUserInfoByToken({token}).then(response => {
                    const { data } = response
                    console.log("resData:",data);
                    // 当前登陆人信息
                    if (data.userDetail) {
                        commit("setLoginUserInfo", data.userDetail);
                    }

                    // 机构列表和 当前机构    
                    if (data.userReponseDetail && data.userReponseDetail.length > 0) {
                        commit("setLoginUserOrganizations", data.userReponseDetail);
                        let index = data.userReponseDetail.length - 1;
                        commit("setLoginUserCurrentOrganization", data.userReponseDetail[index]);
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })               
            })
        },

        // 获取数据字典
        getDictionaryData({ commit }) {
            return new Promise((resolve) => {             
                
                UserService.getDictionaryData().then(response => {
                    const { data } = response
                    console.log("resData:",data);
                    commit("setDictionaryData",data);
                    resolve()
                }).catch(error => {
                    reject(error)
                })              

            })
        },
    },

    getters: {
        loginUserInfo: state => state.loginUserInfo,
        loginUserOrganizations: state => state.loginUserOrganizations,
        loginUserCurrentOrganization: state => state.loginUserCurrentOrganization,
        selectProductId: state => state.selectProductId,
        getDictionaryListByType: state => (prop) => {
            return state.dictionaryData.filter(item => item.dictType === prop);
        }
    }
}

export default base;