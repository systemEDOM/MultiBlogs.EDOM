// tslint:disable-next-line:interface-name
export interface DeletePermissionUseCase<PermissionDTO> {
    execute(id: number): Promise<PermissionDTO>;
}
