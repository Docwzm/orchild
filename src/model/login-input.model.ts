/**
 * Created by guanyj on  11/11/19
 */

export class OrchidLoginInput {
    [key: string]: any;
    uuid?: string;
    account: string = '';
    password: string = '';
    // 1是账号密码  2是手机号验证码  3是微信免密登录
    type: number = 1;
    mobile: string = '';
    verifyCode: string = '';
    imgCode: string = '';
}
