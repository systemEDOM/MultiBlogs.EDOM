import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {DomainDTO} from "../../../domain/entities/DomainDTO";
import { DomainRepository } from "../../../domain/interfaces/DomainRepository";

@injectable()
export class UpdateDomainUseCase {
    private domainRepository: DomainRepository;

    public constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        this.domainRepository = domainRepository;
    }

    public async execute(id: number, domain: DomainDTO): Promise<DomainDTO> {
        return this.domainRepository.update(id, domain);
    }
}
