import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {DomainDTO} from "../../../domain/entities/DomainDTO";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import { FindByIdDomainUseCase } from "./Contracts/FindByIdDomainUseCase";

@injectable()
export class FindByIdDomainUseCaseImpl implements FindByIdDomainUseCase<DomainDTO> {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public async execute(id: number): Promise<DomainDTO> {
        return this.domainRepository.findById(id);
    }
}
