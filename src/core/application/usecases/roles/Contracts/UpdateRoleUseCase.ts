// tslint:disable-next-line:interface-name
export interface UpdateRoleUseCase<RoleDTO> {
    execute(id: number, entity: RoleDTO): Promise<RoleDTO>;
}
