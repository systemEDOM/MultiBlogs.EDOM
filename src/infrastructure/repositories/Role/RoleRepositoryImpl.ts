// tslint:disable-next-line:max-line-length
import {inject, injectable} from "inversify";
import {EntityRepository, Repository as TypeOrmRepository} from "typeorm";
import {RoleDTO} from "../../../core/domain/entities/RoleDTO";
import { RoleRepository } from "../../../core/domain/interfaces/RoleRepository";
import TYPES from "../../../types";
import {Post} from "../../entities/Post";
import {Role} from "../../entities/Role";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Role)
@injectable()
export class RoleRepositoryImpl extends GenericRepositoryImpl<RoleDTO, Role> implements RoleRepository {
    constructor(@inject(TYPES.DomainRepositoryInterface) repository: TypeOrmRepository<Role>) {
        super(repository);
    }
}
