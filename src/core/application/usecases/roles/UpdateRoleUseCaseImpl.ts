import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {RoleDTO} from "../../../domain/entities/RoleDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";
import { RoleRepository } from "../../../domain/interfaces/RoleRepository";
import {UpdateRoleUseCase} from "./Contracts/UpdateRoleUseCase";

@injectable()
export class UpdateRoleUseCaseImpl implements UpdateRoleUseCase<RoleDTO> {
    private roleRepository: RoleRepository;
    private permissionRepository: PermissionRepository;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository,
                @inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    public async execute(id: number, role: RoleDTO): Promise<RoleDTO> {
        // tslint:disable-next-line:no-shadowed-variable
        const roleFound = await this.roleRepository.findById(Number(id)).then( (role) => role);
        roleFound.name = role.name;
        if (role.permissions) {
            const permissions = [];
            // tslint:disable-next-line:forin
            for (const key in role.permissions) {
                const permission = await this.permissionRepository.findById(Number(role.permissions[key]))
                    // tslint:disable-next-line:no-shadowed-variable
                    .then((permission) => permission);
                permissions.push(permission);
            }
            roleFound.permissions = permissions;
        }
        return this.roleRepository.update(id, role);
    }
}
