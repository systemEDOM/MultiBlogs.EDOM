import {inject, injectable} from "inversify";
import {Role} from "../../domain/entity/Role";
import {PermissionRepository} from "../../../core/domain/interfaces/PermissionRepository";
import {RoleRepository} from "../../../core/domain/interfaces/RoleRepository";
import TYPES from "../../../types";
import {RoleService} from "../../../core/application/services/interfaces/RoleService";

@injectable()
export class RoleServiceImpl implements RoleService {
    private roleRepo: RoleRepository;
    private permissionRepo: PermissionRepository;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepo: RoleRepository,
                @inject(TYPES.PermissionRepositoryInterface) permissionRepo: PermissionRepository,) {
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
    }

    public findAll() {
        return this.roleRepo.findAll();
    }

    public async create(role: Role) {
        if (role.permissions) {
            let permissions = [];
            for (const key in role.permissions) {
                const permission = await this.permissionRepo.findById(Number(role.permissions[key]))
                    .then((permission) => permission);
                permissions.push(permission);
            }
            role.permissions = permissions;
        }
        return this.roleRepo.create(role);
    }

    public findById(id: number) {
        return this.roleRepo.findById(id);
    }

    public async update(id: number, role: Role) {
        const roleFound = await this.roleRepo.findById(Number(id)).then(role => role);
        roleFound.name = role.name;
        if (role.permissions) {
            let permissions = [];
            for (const key in role.permissions) {
                const permission = await this.permissionRepo.findById(Number(role.permissions[key]))
                    .then((permission) => permission);
                permissions.push(permission);
            }
            roleFound.permissions = permissions;
        }
        return await this.roleRepo.create(roleFound);
    }

    public delete(id: number) {
        return this.roleRepo.delete(id);
    }
}
