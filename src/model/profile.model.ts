/**
 * 用户实名认证信息
 */
export class ProfileModel {
    // 真实姓名
    name?: string;
    // 性别
    gender?: string;
    // 民族
    nation?: string;
    // 年龄
    age?: string;
    // 出生日期
    birthday?: string;
    // 证件类型
    idType?: number;
    // 证件号码
    idNo?: number;
    // 常住地址
    address?: string;

    // 婚姻状况
    marriage?: string;
    // 教育程度
    edu?: string;
    // 从事行业
    industry?: string;
    // 职业类型
    job?: string;
    // 个人邮箱
    email?: string;
}
