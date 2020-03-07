import { inject, injectable } from "inversify";
import { Domain } from "../../domain/entity/Domain";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import TYPES from "../../../types";
import { CreateDomainUseCase } from "../../../application/usecases/domains/CreateDomainUseCase";

@injectable()
export class CreateDomainsUseCaseImpl implements CreateDomainUseCase {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public handle(domain: Domain) {
        return this.domainRepository.create(domain);
    }
}
