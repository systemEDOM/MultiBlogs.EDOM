// tslint:disable-next-line:max-line-length
import { RoleDTO } from "./RoleDTO";

export class PermissionDTO {
    public id: number;
    public name: string;
    public slug: string;
    public roles: RoleDTO[];
    public createdAt: Date;
    public updatedAt: Date;
}
