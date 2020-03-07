// tslint:disable-next-line:interface-name
export interface DeleteUserUseCase<UserDTO> {
    execute(id: number): Promise<UserDTO>;
}
