// tslint:disable-next-line:interface-name
export interface FindByIdRoleUseCase<RoleDTO> {
    execute(id: number): Promise<RoleDTO>;
}
