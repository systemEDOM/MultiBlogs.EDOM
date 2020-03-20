import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import { RoleDTO } from "../../../domain/entities/RoleDTO";
import { PermissionRepository } from "../../../domain/interfaces/PermissionRepository";
import { RoleRepository } from "../../../domain/interfaces/RoleRepository";

@injectable()
export class UpdateRoleUseCase {
    private roleRepository: RoleRepository;
    private permissionRepository: PermissionRepository;

    public constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository,
        @inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    public async execute(id: number, role: RoleDTO): Promise<RoleDTO> {
        const roleFound = await this.roleRepository.findById(Number(id)).then( roleDTO => roleDTO);
        roleFound.name = role.name;
        if (role.permissions) {
            const permissions = [];
            for (const key of role.permissions) {
                const permission = await this.permissionRepository.findById(Number(key))
                    .then( permissionDTO => permissionDTO);
                permissions.push(permission);
            }
            roleFound.permissions = permissions;
        }
        return this.roleRepository.update(id, role);
    }
}
