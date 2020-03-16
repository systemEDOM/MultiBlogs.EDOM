// tslint:disable-next-line:interface-name
export interface SignInUseCase<UserDTO> {
    login(password: string, entity: UserDTO): Promise<object>;
    getToken(user: UserDTO): string;
    getUser(token: string): Promise<UserDTO>;
    validatePassword(password: string, userPassword: string): Promise<boolean>;
}
