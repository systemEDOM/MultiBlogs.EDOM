import { User } from "../../entity/User";

export interface AuthService {
    login(password: string, user: User);
    getToken(user: User);
    getUser(token: string);
    validatePassword(password: String, userPassword: string);
}