import { inject, injectable } from "inversify";
import { Domain } from "../../entity/Domain";
import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
import { UpdateDomainsUseCaseInterface } from "./contracts/UpdateDomainsUseCaseInterface";

@injectable()
export class UpdateDomainsUseCaseImpl implements UpdateDomainsUseCaseInterface {
    private domainRepository: DomainRepositoryInterface;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        this.domainRepository = domainRepository;
    }

    public handle(id: number, domain: Domain) {
        return this.domainRepository.update(id, domain);
    }
}
