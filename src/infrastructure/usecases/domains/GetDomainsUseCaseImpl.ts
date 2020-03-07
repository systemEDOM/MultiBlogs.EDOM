import { inject, injectable } from "inversify";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import TYPES from "../../../types";
import { GetDomainsUseCase } from "../../../application/usecases/domains/GetDomainsUseCase";

@injectable()
export class GetDomainsUseCaseImpl implements GetDomainsUseCase {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public handle() {
        return this.domainRepository.findAll();
    }
}
