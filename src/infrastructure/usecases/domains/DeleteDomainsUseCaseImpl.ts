import { inject, injectable } from "inversify";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import TYPES from "../../../types";
import { DeleteDomainUseCase } from "../../../application/usecases/domains/DeleteDomainUseCase";

@injectable()
export class DeleteDomainsUseCaseImpl implements DeleteDomainUseCase {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public handle(id: number) {
        return this.domainRepository.delete(id);
    }
}
