// tslint:disable-next-line:interface-name
export interface GetRolesUseCase<RoleDTO> {
    execute(): Promise<RoleDTO[]>;
}
