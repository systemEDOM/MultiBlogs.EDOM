// tslint:disable-next-line:interface-name
export interface FindByIdPermissionUseCase<PermissionDTO> {
    execute(id: number): Promise<PermissionDTO>;
}
