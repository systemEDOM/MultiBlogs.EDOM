// tslint:disable-next-line:max-line-length
import { injectable } from "inversify";
import slugify from "slugify";
// tslint:disable-next-line:max-line-length
import {EntityRepository, getRepository, Repository} from "typeorm";
import {Permission} from "../../domain/entity/Permission";
import { PermissionRepository } from "../../../domain/interfaces/PermissionRepository";

@EntityRepository(Permission)
@injectable()
export class PermissionRepositoryImpl implements PermissionRepository {
    private permissionRepository: Repository<Permission>;

    constructor() {
        this.permissionRepository = getRepository(Permission);
    }

    public findAll() {
        return this.permissionRepository.find();
    }

    public create(permission: Permission) {
        permission.slug = slugify(permission.name);
        const permissionObj = this.permissionRepository.create(permission);
        return this.permissionRepository.save(permissionObj);
    }

    public findById(id: number) {
        return this.permissionRepository.findOneOrFail(id);
    }

    public update(id: number, permission: Permission) {
        permission.slug = slugify(permission.name);
        return this.permissionRepository.update(id, {...permission});
    }

    public delete(id: number) {
        return this.permissionRepository.delete(id);
    }
}
