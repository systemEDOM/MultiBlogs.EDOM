// tslint:disable-next-line:interface-name
export interface CreateRoleUseCase<RoleDTO> {
    execute(entity: RoleDTO): Promise<RoleDTO>;
}
