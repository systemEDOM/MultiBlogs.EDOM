// tslint:disable-next-line:interface-name
export interface UpdateDomainsUseCase<DomainDTO> {
    execute(id: number, entity: DomainDTO): Promise<DomainDTO>;
}
