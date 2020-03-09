import { inject, injectable } from "inversify";
import { DomainRepository } from "../../../core/domain/interfaces/DomainRepository";
import TYPES from "../../../types";
import { FindByIdDomainUseCase } from "../../../core/application/usecases/domains/FindByIdDomainUseCase";

@injectable()
export class FindByIdDomainsUseCaseImpl implements FindByIdDomainUseCase {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public handle(id: number) {
        return this.domainRepository.findById(id);
    }
}
