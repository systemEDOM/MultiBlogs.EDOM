// tslint:disable-next-line:interface-name
export interface FindByUsernameUserUseCase<UserDTO> {
    execute(username: string): Promise<UserDTO>;
}
