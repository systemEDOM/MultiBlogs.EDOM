// tslint:disable-next-line:interface-name
export interface GetPermissionsUseCase<PermissionDTO> {
    execute(): Promise<PermissionDTO[]>;
}
