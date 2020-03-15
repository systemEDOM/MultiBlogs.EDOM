// tslint:disable-next-line:max-line-length
import { PermissionDTO } from "./PermissionDTO";
import { UserDTO } from "./UserDTO";

// tslint:disable-next-line:interface-name
export interface RoleDTO {
    id: number;
    name: string;
    slug: string;
    permissions: PermissionDTO[];
    users: UserDTO[];
    createdAt: Date;
    updatedAt: Date;
}
