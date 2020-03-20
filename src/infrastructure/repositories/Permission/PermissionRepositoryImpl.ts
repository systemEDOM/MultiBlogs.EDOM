import {inject, injectable} from "inversify";
import {EntityRepository, getRepository, Repository} from "typeorm";
import {PermissionDTO} from "../../../core/domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../core/domain/interfaces/PermissionRepository";
import {Permission} from "../../entities/Permission";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Permission)
@injectable()
export class PermissionRepositoryImpl extends GenericRepositoryImpl<PermissionDTO, Permission> implements PermissionRepository {
    public constructor() {
        super(getRepository(Permission));
    }
}
