import request from '@/utils/request'
import { OrchidLoginInput } from '@/model/login-input.model';

class UserService {
    static login(data: any) {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/login/pc/v1',
            data
        })
    }

    /**
     * 获取图片验证码
     */
    static getRsaKey() {
        return request({
            method: 'post',
            url: 'orchid-unify/auth/login/defaultKaptcha/v1'
        })
    }

    /**
     * 获取手机验证码
     * @param {string} mobile
     */
    static getVerifyCode(mobile: string) {
        return request({
            method: 'post',
            url: '/orchid-unify/auth/login/sendSms/v1',
            data: {
                mobile,
                source: '运营端小程序'
            }
        });
    }

    /**
     * 用户注册
     * @param input
     */
    static authRegister(input: OrchidLoginInput) {
        const params = {
            newPassword: input.password,
            confirmPassword: input.password,
            account: input.account,
            mobile: input.mobile,
            verifyCode: input.verifyCode
        };
        return request({
            method: 'post',
            url: '/orchid-unify/auth/login/regist/v1',
            data: {
                ...params,
                source: '运营端小程序'
            }
        });
    }

    /**
     * 重置密码
     * @param input
     */
    static authResetPwd(input: OrchidLoginInput) {
        const params = {
            newPassword: input.password,
            confirmPassword: input.password,
            mobile: input.mobile,
            verifyCode: input.verifyCode
        };
        return request({
            method: 'post',
            url: '/orchid-unify/auth/login/getPwd/v1',
            data: {
                ...params,
                source: '运营端小程序'
            }
        });
    }

    static getUserInfoByToken(data: any) {
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

    static getDictionaryData() {
        return request({
            method: 'post',
            url: 'orchid-unify/dict/list/all/v1'
        })
    }

    /**
     * 获取用户基础信息
     * @param params 
     */
    static getPersonalCentreInfo(params: any) {
        return request({
            method: 'get',
            url: '/orchid-web-customer/user/personalCentreInfo',
            params
        })
    }
}

export default UserService
