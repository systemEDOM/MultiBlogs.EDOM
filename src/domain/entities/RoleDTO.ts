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
}
