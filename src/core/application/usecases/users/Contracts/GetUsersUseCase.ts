// tslint:disable-next-line:interface-name
export interface GetUsersUseCase<UserDTO> {
    execute(): Promise<UserDTO[]>;
}
