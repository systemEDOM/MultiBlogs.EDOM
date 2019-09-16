import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { Domain } from "../../entity/Domain";
import { DeleteDomainsUseCaseInterface } from "./contracts/DeleteDomainsUseCaseInterface";

@injectable()
export class DeleteDomainsUseCaseImpl implements DeleteDomainsUseCaseInterface {
    private domainRepository: DomainRepositoryInterface;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        this.domainRepository = domainRepository;
    }
    
    public handle(id: number) {
        return this.domainRepository.delete(id);
    }
}