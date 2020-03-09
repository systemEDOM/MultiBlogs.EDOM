// tslint:disable-next-line:interface-name
export interface CreateUserUseCase<UserDTO> {
    execute(entity: UserDTO): Promise<UserDTO>;
}
