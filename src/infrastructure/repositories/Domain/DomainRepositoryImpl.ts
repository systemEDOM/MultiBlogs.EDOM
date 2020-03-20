import {inject, injectable} from "inversify";
import {EntityRepository, getRepository} from "typeorm";
import {DomainDTO} from "../../../core/domain/entities/DomainDTO";
import { DomainRepository } from "../../../core/domain/interfaces/DomainRepository";
import {Domain} from "../../entities/Domain";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Domain)
@injectable()
export class DomainRepositoryImpl extends GenericRepositoryImpl<DomainDTO, Domain> implements DomainRepository {
    public constructor() {
        super(getRepository(Domain));
    }
}
