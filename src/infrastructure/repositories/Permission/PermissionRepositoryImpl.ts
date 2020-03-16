// tslint:disable-next-line:max-line-length
import {inject, injectable} from "inversify";
// tslint:disable-next-line:max-line-length
import {EntityRepository, getRepository, Repository, Repository as TypeOrmRepository} from "typeorm";
import {PermissionDTO} from "../../../core/domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../core/domain/interfaces/PermissionRepository";
import TYPES from "../../../types";
import {Permission} from "../../entities/Permission";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Permission)
@injectable()
// tslint:disable-next-line:max-line-length
export class PermissionRepositoryImpl extends GenericRepositoryImpl<PermissionDTO, Permission> implements PermissionRepository {
    constructor(@inject(TYPES.DomainRepositoryInterface) repository: TypeOrmRepository<Permission>) {
        super(repository);
    }
}
