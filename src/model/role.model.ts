
/**
 * 角色模型
 * @author guanyj
 */
export class RoleModel {
    [key: string]: any;
    memberId?: number;
    memberName?: string;
    organizationId?: number;
    organizationName?: string;

    // 是否实名认证 0:否  1:是
    isCredit?: number;

    /**
     * @deprecated 暂不生效
     */
    isDefault?: boolean;
    mobile?: string;
    nature?: string;

    get isOrganization(): boolean {
        return !this.organizationId;
    }

    constructor(options?: RoleModel) {
        if (options) {
            Object.keys(options).forEach(key => {
                this[key] = options[key];
            });
        }
    }
}
