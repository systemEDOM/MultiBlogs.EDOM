import { inject, injectable } from "inversify";
import { Domain } from "../../domain/entity/Domain";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import TYPES from "../../../types";
import { UpdateDomainsUseCase } from "../../../application/usecases/domains/UpdateDomainsUseCase";

@injectable()
export class UpdateDomainsUseCaseImpl implements UpdateDomainsUseCase {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public handle(id: number, domain: Domain) {
        return this.domainRepository.update(id, domain);
    }
}
