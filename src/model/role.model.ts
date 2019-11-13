
/**
 * 角色模型
 * @author guanyj
 */
export class RoleModel {
    [key: string]: any;
    memberId: number;
    memberName: string;
    organizationId: number;
    organizationName: string;

    isCredit: number;
    isDefault: boolean;
    mobile: string;
    nature: string;

    get isOrganization(): boolean {
        return !this.organizationId;
    }
}
