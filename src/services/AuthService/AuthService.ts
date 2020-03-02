import { User } from "../../entity/User";

// tslint:disable-next-line:interface-name
export interface AuthService {
    login(password: string, user: User);
    getToken(user: User);
    getUser(token: string);
    // tslint:disable-next-line:ban-types
    validatePassword(password: String, userPassword: string);
}
