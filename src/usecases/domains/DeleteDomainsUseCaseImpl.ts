import { inject, injectable } from "inversify";
import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
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
