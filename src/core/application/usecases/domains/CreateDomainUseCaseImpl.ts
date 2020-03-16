import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {DomainDTO} from "../../../domain/entities/DomainDTO";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import { CreateDomainUseCase } from "./Contracts/CreateDomainUseCase";

@injectable()
export class CreateDomainUseCaseImpl implements CreateDomainUseCase<DomainDTO> {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public async execute(entity: DomainDTO): Promise<DomainDTO> {
        return this.domainRepository.create(entity);
    }
}
