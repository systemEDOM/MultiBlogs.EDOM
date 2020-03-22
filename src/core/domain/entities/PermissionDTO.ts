import { RoleDTO } from "./RoleDTO";

export interface PermissionDTO {
    id: number;
    name: string;
    slug: string;
    roles: any[];
    createdAt: Date;
    updatedAt: Date;
}
