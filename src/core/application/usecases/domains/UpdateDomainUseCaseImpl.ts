import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {DomainDTO} from "../../../domain/entities/DomainDTO";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import { UpdateDomainsUseCase } from "./Contracts/UpdateDomainsUseCase";

@injectable()
export class UpdateDomainUseCaseImpl implements UpdateDomainsUseCase<DomainDTO> {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public async execute(id: number, domain: DomainDTO): Promise<DomainDTO> {
        return this.domainRepository.update(id, domain);
    }
}
