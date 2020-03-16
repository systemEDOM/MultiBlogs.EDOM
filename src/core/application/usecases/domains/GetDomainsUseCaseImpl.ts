import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {DomainDTO} from "../../../domain/entities/DomainDTO";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";
import { GetDomainsUseCase } from "./Contracts/GetDomainsUseCase";

@injectable()
export class GetDomainsUseCaseImpl implements GetDomainsUseCase<DomainDTO> {
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public async execute(): Promise<DomainDTO[]> {
        return this.domainRepository.findAll();
    }
}
