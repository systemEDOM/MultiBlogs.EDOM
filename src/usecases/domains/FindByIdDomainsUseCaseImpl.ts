import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { Domain } from "../../entity/Domain";
import { FindByIdDomainsUseCaseInterface } from "./contracts/FindByIdDomainsUseCaseInterface";

@injectable()
export class FindByIdDomainsUseCaseImpl implements FindByIdDomainsUseCaseInterface {
    private domainRepository: DomainRepositoryInterface;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        this.domainRepository = domainRepository;
    }
    
    public handle(id: number) {
        return this.domainRepository.findById(id);
    }
}