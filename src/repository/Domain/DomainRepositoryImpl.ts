import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository} from "typeorm";
import {Domain} from "../../entity/Domain";
import { DomainRepositoryInterface } from "./DomainRepositoryInterface";
import { injectable } from "inversify";

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
        const domainObj = this.domainRepository.create(domain);
        return this.domainRepository.save(domainObj);
    }

    findById(id: number) {
        return this.domainRepository.findOneOrFail(id);
    }

    update(id: number, domain: Domain) {
        return this.domainRepository.findOne(id).then(res => {
            res.name = domain.name;
            res.url = domain.url;
            return this.domainRepository.save(res);
        });
    }

    delete(id: number) {
        return this.domainRepository.delete(id);
    }
}