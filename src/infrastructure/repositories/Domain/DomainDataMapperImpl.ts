import {DomainDTO} from "../../../core/domain/entities/DomainDTO";
import {Domain} from "../../entities/Domain";
import {EntityDataMapper} from "../../interfaces/EntityDataMapper";

export class DomainDataMapperImpl implements EntityDataMapper<DomainDTO, Domain> {

    public toDomain(entity: Domain): DomainDTO {
        // tslint:disable-next-line:max-line-length
        return new DomainDTO(entity.id, entity.name, entity.slug, entity.url, entity.createdAt, entity.updatedAt);
    }

    public toORMEntity(domainDTO: DomainDTO): Domain {
        const domain = new Domain();
        domain.id = domainDTO.id;
        domain.name = domainDTO.name;
        domain.slug = domainDTO.slug;
        domain.url = domainDTO.url;
        domain.createdAt = domainDTO.createdAt;
        domain.updatedAt = domainDTO.updatedAt;

        return domain;
    }
}
