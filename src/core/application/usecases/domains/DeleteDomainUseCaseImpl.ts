import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {DomainDTO} from "../../../domain/entities/DomainDTO";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import { DeleteDomainUseCase } from "./Contracts/DeleteDomainUseCase";

@injectable()
export class DeleteDomainUseCaseImpl implements DeleteDomainUseCase<DomainDTO> {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public async execute(id: number): Promise<DomainDTO> {
        return this.domainRepository.delete(id);
    }
}
