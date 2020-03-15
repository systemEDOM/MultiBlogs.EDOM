import {inject, injectable} from "inversify";
import slugify from "slugify";
// tslint:disable-next-line:max-line-length
import {EntityRepository, getRepository, Repository as TypeOrmRepository} from "typeorm";
import {DomainDTO} from "../../../core/domain/entities/DomainDTO";
import { DomainRepository } from "../../../core/domain/interfaces/DomainRepository";
import TYPES from "../../../types";
import {Domain} from "../../entities/Domain";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Domain)
@injectable()
export class DomainRepositoryImpl extends GenericRepositoryImpl<DomainDTO, Domain> implements DomainRepository {
    constructor(@inject(TYPES.DomainRepositoryInterface) repository: TypeOrmRepository<Domain>) {
        super(repository);
    }
}
