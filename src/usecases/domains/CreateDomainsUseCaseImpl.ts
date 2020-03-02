import { inject, injectable } from "inversify";
import { Domain } from "../../entity/Domain";
import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
import { CreateDomainsUseCaseInterface } from "./contracts/CreateDomainsUseCaseInterface";

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
