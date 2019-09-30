
const base = {
    state: {
        loginUserInfo:[], //当前登录用户
        loginUserOrganizations:[],   // 当前登录用户所处所有
        loginUserCurrentOrganization:{}     // 当前登录用户
    },
    mutations: {
        setloginUserInfoList:(state,userInfoList)=>{            
            state.loginUserInfoList=userInfoList;                  
        },   
        clearLoginUserInfo:(state,userInfoList)=>{
            state.loginUserInfoList=[];
        },          
    },

    actions: {
        // 存储token
        Token({ commit }, token) {
            return new Promise((resolve, reject) => {
                setToken(token);
                resolve();
            })
        },

        // 获取用户信息
        GetLoginUserInfo({ commit, state },type) {
            return new Promise((resolve, reject) => {                
                httpRequest({
                    url: "/orchid-unify/auth/userinfo/v1",
                    params: {
                        token: getToken()
                    },
                    success: res => {
 
                        if(res.data.userReponseDetail.length>0){                            
                            let index=res.data.userReponseDetail.length-1;
                            commit("setloginUserInfoList",res.data.userReponseDetail);                              
                            let userIndex=sessionStorage.getItem("loginUserIndex");
                            if(type=="login"||!userIndex){
                                sessionStorage.setItem("loginUserIndex",index);
                            }                                                            
                        }else {
                            this.$message.error('无登陆权限');
                        }
                        
                        resolve(res.data.userReponseDetail);                                                              
                    }
                });                
            })
        },            
    },

    getters:{
        loginUserInfo:(state)=>{    
            let userinfo=null;        
            if(state.loginUserInfoList&&state.loginUserInfoList.length>0){
                // let length=state.loginUserInfoList.length;       
                let index=sessionStorage.getItem("loginUserIndex");     
                userinfo=state.loginUserInfoList[index];
            }                
            return userinfo;
        },
        userInfo: (state,getters)=>prop => {
            if (getters.loginUserInfo && getters.loginUserInfo[prop]) {
                return getters.loginUserInfo[prop];
            } 
        },
        loginUserInfoList: state => state.loginUserInfoList,
    }
}

export default user;
