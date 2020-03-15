// tslint:disable-next-line:max-line-length
import { RoleDTO } from "./RoleDTO";

// tslint:disable-next-line:interface-name
export interface PermissionDTO {
    id: number;
    name: string;
    slug: string;
    roles: RoleDTO[];
    createdAt: Date;
    updatedAt: Date;
}
