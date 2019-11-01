import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository, getManager, getConnection} from "typeorm";
import {Domain} from "../../entity/Domain";
import { DomainRepositoryInterface } from "./DomainRepositoryInterface";
import { injectable } from "inversify";
import slugify from "slugify";

@EntityRepository(Domain)
@injectable()
export class DomainRepositoryImpl implements DomainRepositoryInterface {
    private domainRepository: Repository<Domain>;
    
    constructor() {
        this.domainRepository = getRepository(Domain);
    }

    findAll() {
        return this.domainRepository.find();
    }

    create(domain: Domain) {
        domain.name = slugify(domain.name);
        const domainObj = this.domainRepository.create(domain);
        return this.domainRepository.save(domainObj);
    }

    findById(id: number) {
        return this.domainRepository.findOneOrFail(id);
    }

    update(id: number, domain: Domain) {
        domain.name = slugify(domain.name);
        return this.domainRepository.update(id, {...domain});
    }

    delete(id: number) {
        return this.domainRepository.delete(id);
    }
}