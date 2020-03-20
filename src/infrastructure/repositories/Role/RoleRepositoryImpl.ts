// tslint:disable-next-line:max-line-length
import {injectable} from "inversify";
import {EntityRepository, getRepository} from "typeorm";
import {RoleDTO} from "../../../core/domain/entities/RoleDTO";
import {RoleRepository} from "../../../core/domain/interfaces/RoleRepository";
import {Role} from "../../entities/Role";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Role)
@injectable()
export class RoleRepositoryImpl extends GenericRepositoryImpl<RoleDTO, Role> implements RoleRepository {
    public constructor() {
        super(getRepository(Role));
    }
}
