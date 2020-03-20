import { PermissionDTO } from "./PermissionDTO";
import { UserDTO } from "./UserDTO";

export interface RoleDTO {
    id: number;
    name: string;
    slug: string;
    permissions: PermissionDTO[];
    users: UserDTO[];
    createdAt: Date;
    updatedAt: Date;
}
