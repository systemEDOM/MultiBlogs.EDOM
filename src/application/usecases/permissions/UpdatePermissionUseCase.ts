// tslint:disable-next-line:interface-name
export interface UpdatePermissionUseCase<PermissionDTO> {
    execute(id: number, entity: PermissionDTO): Promise<PermissionDTO>;
}
