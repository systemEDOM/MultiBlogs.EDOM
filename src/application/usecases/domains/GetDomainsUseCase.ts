// tslint:disable-next-line:interface-name
export interface GetDomainsUseCase<DomainDTO> {
    execute(): Promise<DomainDTO[]>;
}
