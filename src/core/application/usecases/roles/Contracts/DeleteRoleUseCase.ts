// tslint:disable-next-line:interface-name
export interface DeleteRoleUseCase<RoleDTO> {
    execute(id: number): Promise<RoleDTO>;
}
