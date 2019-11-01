import { EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository, getManager, getConnection } from "typeorm";
import { Role } from "../../entity/Role";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import { RoleService } from "./RoleService";
import { RoleRepositoryInterface } from "../../repository/Role/RoleRepositoryInterface";
import { PermissionRepositoryInterface } from "../../repository/Permission/PermissionRepositoryInterface";
import { Permission } from "../../entity/Permission";

@injectable()
export class RoleServiceImpl implements RoleService {
    private roleRepo: RoleRepositoryInterface;
    private permissionRepo: PermissionRepositoryInterface;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepo: RoleRepositoryInterface,
        @inject(TYPES.PermissionRepositoryInterface) permissionRepo: PermissionRepositoryInterface, ) {
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
    }

    findAll() {
        return this.roleRepo.findAll();
    }

    async create(role: Role) {
        if (role.permissions) {
            var permissions = [];
            for (let key in role.permissions) {
                var permission = await this.permissionRepo.findById(Number(role.permissions[key]))
                    .then((permission) => permission);
                permissions.push(permission);
            }
            role.permissions = permissions;
        }
        return this.roleRepo.create(role);
    }

    findById(id: number) {
        return this.roleRepo.findById(id);
    }

    async update(id: number, role: Role) {
        let roleFound = await this.roleRepo.findById(Number(id)).then(role => role);
        roleFound.name = role.name;
        if (role.permissions) {
            var permissions = [];
            for (let key in role.permissions) {
                let permission = await this.permissionRepo.findById(Number(role.permissions[key]))
                    .then((permission) => permission);
                permissions.push(permission);
            }
            roleFound.permissions = permissions;
        }
        return await this.roleRepo.create(roleFound);
    }

    delete(id: number) {
        return this.roleRepo.delete(id);
    }
}