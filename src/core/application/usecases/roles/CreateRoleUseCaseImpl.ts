import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {RoleDTO} from "../../../domain/entities/RoleDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";
import {RoleRepository} from "../../../domain/interfaces/RoleRepository";
import {CreateRoleUseCase} from "./Contracts/CreateRoleUseCase";

@injectable()
export class CreateRoleUseCaseImpl implements CreateRoleUseCase<RoleDTO> {
    private roleRepository: RoleRepository;
    private permissionRepository: PermissionRepository;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository,
                @inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    public async execute(role: RoleDTO): Promise<RoleDTO> {
        if (role.permissions) {
            const permissions = [];
            // tslint:disable-next-line:forin
            for (const key in role.permissions) {
                const permission = await this.permissionRepository.findById(Number(role.permissions[key]))
                    // tslint:disable-next-line:no-shadowed-variable
                    .then((permission) => permission);
                permissions.push(permission);
            }
            role.permissions = permissions;
        }
        return await this.roleRepository.create(role);
    }
}
