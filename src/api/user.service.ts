import request from '@/utils/request'
import { OrchidLoginInput } from '@/model/login-input.model';

class UserService {
    static login (data: any) {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/login/pc/v1',
            data
        })
    }

    /**
     * 获取图片验证码
     */
    static getRsaKey () {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/login/defaultKaptcha/v1'
        })
    }

    static getUserInfoByToken (data:any) {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/userinfo/v1',
            data
        })
    }

    /**
     * 升级版登录
     * @param input
     */
    static loginV2(input: OrchidLoginInput) {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/login/v2.0',
            data: input
        });
    }

    static getDictionaryData () {
        return request({
            method: 'post',
            url: 'orchid-unify/dict/list/all/v1'
        })
    }
}

export default UserService
