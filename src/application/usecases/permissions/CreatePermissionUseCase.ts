// tslint:disable-next-line:interface-name
export interface CreatePermissionUseCase<PermissionDTO> {
    execute(entity: PermissionDTO): Promise<PermissionDTO>;
}
