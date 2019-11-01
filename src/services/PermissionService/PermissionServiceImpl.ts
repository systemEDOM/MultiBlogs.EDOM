import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository, getManager, getConnection} from "typeorm";
import {Permission} from "../../entity/Permission";
import { injectable, inject } from "inversify";
import slugify from "slugify";
import { PermissionService } from "./PermissionService";
import TYPES from "../../types";
import { PermissionRepositoryInterface } from "../../repository/Permission/PermissionRepositoryInterface";

@injectable()
export class PermissionServiceImpl implements PermissionService {
    private permissionRepo: PermissionRepositoryInterface;
    
    constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepo: PermissionRepositoryInterface) {
        this.permissionRepo = permissionRepo;
    }

    findAll() {
        return this.permissionRepo.findAll();
    }

    create(permission: Permission) {
        return this.permissionRepo.create(permission);
    }

    findById(id: number) {
        return this.permissionRepo.findById(id);
    }

    update(id: number, permission: Permission) {
        return this.permissionRepo.update(id, permission);
    }

    delete(id: number) {
        return this.permissionRepo.delete(id);
    }
}