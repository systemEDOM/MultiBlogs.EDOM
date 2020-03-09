// tslint:disable-next-line:max-line-length
import { PermissionDTO } from "./PermissionDTO";
import { UserDTO } from "./UserDTO";

export class RoleDTO {
    public id: number;
    public name: string;
    public slug: string;
    public permissions: PermissionDTO[];
    public users: UserDTO[];
    public createdAt: Date;
    public updatedAt: Date;

    // tslint:disable-next-line:max-line-length
    constructor(id: number, name: string, slug: string, permissions: PermissionDTO[], users: UserDTO[], createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.permissions = permissions;
        this.users = users;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
