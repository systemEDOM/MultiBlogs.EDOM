import { inject, injectable } from "inversify";
import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
import { GetDomainsUseCaseInterface } from "./contracts/GetDomainsUseCaseInterface";

@injectable()
export class GetDomainsUseCaseImpl implements GetDomainsUseCaseInterface {
    private domainRepository: DomainRepositoryInterface;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        this.domainRepository = domainRepository;
    }

    public handle() {
        return this.domainRepository.findAll();
    }
}
