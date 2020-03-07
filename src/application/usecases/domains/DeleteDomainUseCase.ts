// tslint:disable-next-line:interface-name
export interface DeleteDomainUseCase<DomainDTO> {
    handle(id: number): Promise<DomainDTO>;
}
