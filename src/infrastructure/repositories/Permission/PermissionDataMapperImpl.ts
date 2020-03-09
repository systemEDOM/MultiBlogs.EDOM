import {PermissionDTO} from "../../../core/domain/entities/PermissionDTO";
import {Permission} from "../../entities/Permission";
import {EntityDataMapper} from "../../interfaces/EntityDataMapper";

export class PermissionDataMapperImpl implements EntityDataMapper<PermissionDTO, Permission> {

    public toDomain(entity: Permission): PermissionDTO {
        // tslint:disable-next-line:max-line-length
        return new PermissionDTO(entity.id, entity.name, entity.slug, entity.roles, entity.createdAt, entity.updatedAt);
    }

    public toORMEntity(permissionDTO: PermissionDTO): Permission {
        const permission = new Permission();
        permission.id = permissionDTO.id;
        permission.name = permissionDTO.name;
        permission.slug = permissionDTO.slug;
        permission.roles = permissionDTO.roles;
        permission.createdAt = permissionDTO.createdAt;
        permission.updatedAt = permissionDTO.updatedAt;

        return permission;
    }
}
