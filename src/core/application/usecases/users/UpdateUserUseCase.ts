// tslint:disable-next-line:interface-name
export interface UpdateUserUseCase<UserDTO> {
    execute(id: number, entity: UserDTO): Promise<UserDTO>;
}
