// tslint:disable-next-line:max-line-length
import { RoleDTO } from "./RoleDTO";

export class PermissionDTO {
    public id: number;
    public name: string;
    public slug: string;
    public roles: RoleDTO[];
    public createdAt: Date;
    public updatedAt: Date;

    constructor(id: number, name: string, slug: string, roles: RoleDTO[], createdAt: Date, updateAt: Date) {
        this.id = id;
        this.name = name;
        this.roles = roles;
        this.createdAt = createdAt;
        this.updatedAt = updateAt;
    }
}
