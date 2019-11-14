/**
 * 用户实名认证信息
 */
export class ProfileModel {
    [key: string]: any;

    id: any;
    // 真实姓名
    name?: any;
    // 性别
    gender?: any;
    // 民族
    nation?: any;
    // 年龄
    age?: any;
    // 出生日期
    birthday?: any;
    // 证件类型
    idType?: any;
    // 证件号码
    idNo: any;
    // 常住地区
    region: any;
    // 常住地址
    address?: any;
    // 证件有效期
    effectiveEnd?: any;

    // 婚姻状况
    marriage?: any;
    // 教育程度
    edu?: any;
    // 从事行业
    industry?: any;
    // 职业类型
    job?: any;
    // 个人邮箱
    email?: any;
}
