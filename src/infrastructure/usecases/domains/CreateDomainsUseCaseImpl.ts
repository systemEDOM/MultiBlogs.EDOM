import { inject, injectable } from "inversify";
import { CreateDomainUseCase } from "../../../core/application/usecases/domains/CreateDomainUseCase";
import {DomainDTO} from "../../../core/domain/entities/DomainDTO";
import { DomainRepository } from "../../../core/domain/interfaces/DomainRepository";
import TYPES from "../../../types";

@injectable()
export class CreateDomainsUseCaseImpl implements CreateDomainUseCase<DomainDTO> {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public execute(entity: DomainDTO): Promise<DomainDTO> {
        return this.domainRepository.create(entity);
    }
}
