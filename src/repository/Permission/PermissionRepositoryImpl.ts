import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository, getManager, getConnection} from "typeorm";
import {Permission} from "../../entity/Permission";
import { injectable } from "inversify";
import slugify from "slugify";
import { PermissionRepositoryInterface } from "./PermissionRepositoryInterface";

@EntityRepository(Permission)
@injectable()
export class PermissionRepositoryImpl implements PermissionRepositoryInterface {
    private permissionRepository: Repository<Permission>;
    
    constructor() {
        this.permissionRepository = getRepository(Permission);
    }

    findAll() {
        return this.permissionRepository.find();
    }

    create(permission: Permission) {
        permission.slug = slugify(permission.name);
        const permissionObj = this.permissionRepository.create(permission);
        return this.permissionRepository.save(permissionObj);
    }

    findById(id: number) {
        return this.permissionRepository.findOneOrFail(id);
    }

    update(id: number, permission: Permission) {
        permission.slug = slugify(permission.name);
        return this.permissionRepository.update(id, {...permission});
    }

    delete(id: number) {
        return this.permissionRepository.delete(id);
    }
}