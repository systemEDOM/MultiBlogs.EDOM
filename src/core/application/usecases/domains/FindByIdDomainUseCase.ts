// tslint:disable-next-line:interface-name
export interface FindByIdDomainUseCase<DomainDTO> {
    execute(id: number): Promise<DomainDTO>;
}
