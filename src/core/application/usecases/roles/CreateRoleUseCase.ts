import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import { RoleDTO } from "../../../domain/entities/RoleDTO";
import { PermissionRepository } from "../../../domain/interfaces/PermissionRepository";
import { RoleRepository } from "../../../domain/interfaces/RoleRepository";

@injectable()
export class CreateRoleUseCase {
    private roleRepository: RoleRepository;
    private permissionRepository: PermissionRepository;

    public constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository,
        @inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    public async execute(role: RoleDTO): Promise<RoleDTO> {
        if (role.permissions) {
            const permissions = [];
            for (const key of role.permissions) {
                const permission = await this.permissionRepository.findById(Number(key))
                    .then( permissionDTO => permissionDTO);
                permissions.push(permission);
            }
            role.permissions = permissions;
        }
        return await this.roleRepository.create(role);
    }
}
