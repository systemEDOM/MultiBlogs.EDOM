// tslint:disable-next-line:interface-name
export interface DeleteDomainUseCase<DomainDTO> {
    execute(id: number): Promise<DomainDTO>;
}
