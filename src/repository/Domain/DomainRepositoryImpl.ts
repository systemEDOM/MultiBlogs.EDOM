import { injectable } from "inversify";
import slugify from "slugify";
// tslint:disable-next-line:max-line-length
import {Connection, ConnectionOptions, createConnection, EntityManager, EntityRepository, getConnection, getManager, getRepository, Repository} from "typeorm";
import {Domain} from "../../entity/Domain";
import { DomainRepositoryInterface } from "./DomainRepositoryInterface";

@EntityRepository(Domain)
@injectable()
export class DomainRepositoryImpl implements DomainRepositoryInterface {
    private domainRepository: Repository<Domain>;
    constructor() {
        this.domainRepository = getRepository(Domain);
    }

    public findAll() {
        return this.domainRepository.find();
    }

    public create(domain: Domain) {
        domain.name = slugify(domain.name);
        const domainObj = this.domainRepository.create(domain);
        return this.domainRepository.save(domainObj);
    }

    public findById(id: number) {
        return this.domainRepository.findOneOrFail(id);
    }

    public update(id: number, domain: Domain) {
        domain.name = slugify(domain.name);
        return this.domainRepository.update(id, {...domain});
    }

    public delete(id: number) {
        return this.domainRepository.delete(id);
    }
}
