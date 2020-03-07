// tslint:disable-next-line:interface-name
export interface FindByIdUserUseCase<UserDTO> {
    execute(id: number): Promise<UserDTO>;
}
