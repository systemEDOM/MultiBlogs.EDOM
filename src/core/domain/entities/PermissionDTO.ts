import { RoleDTO } from "./RoleDTO";

export interface PermissionDTO {
    id: number;
    name: string;
    slug: string;
    roles: RoleDTO[];
    createdAt: Date;
    updatedAt: Date;
}
