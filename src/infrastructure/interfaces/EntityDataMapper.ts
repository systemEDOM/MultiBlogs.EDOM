// tslint:disable-next-line:interface-name
export interface EntityDataMapper<Domain, Entity> {
    toDomain(entity: Entity): Domain;
    toDalEntity(domain: Domain): Entity;
}
