import request from '@/utils/request'

class UserService {
    static login (data: any) {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/login/pc/v1',
            data
        })
    }

    static getRsaKey () {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/login/defaultKaptcha/v1'
        })
    }

    static getUserInfoByToken(data:any){
        return request({
            method: 'post',
            url: 'orchid-unify/auth/userinfo/v1',
            data
        })    
    }

    static getDictionaryData(){
        return request({
            method: 'post',
            url: '/orchid-unify/dict/list/all/v1'            
        })   
    }
}

export default UserService
