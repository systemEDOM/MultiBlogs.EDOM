import {DomainDTO} from "../../../../domain/entities/DomainDTO";

// tslint:disable-next-line:interface-name no-shadowed-variable
export interface CreateDomainUseCase<DomainDTO> {
    execute(entity: DomainDTO): Promise<DomainDTO>;
}
