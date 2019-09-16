import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { CreateDomainsUseCaseInterface } from "./contracts/CreateDomainsUseCaseInterface";
import { Domain } from "../../entity/Domain";

@injectable()
export class CreateDomainsUseCaseImpl implements CreateDomainsUseCaseInterface {
    private domainRepository: DomainRepositoryInterface;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        this.domainRepository = domainRepository;
    }
    
    public handle(domain: Domain) {
        return this.domainRepository.create(domain);
    }
}