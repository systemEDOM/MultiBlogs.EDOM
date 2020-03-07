import * as bcrypt from "bcryptjs";
import {injectable} from "inversify";
import * as jwt from "jsonwebtoken";
import {User} from "../../domain/entity/User";
import {SignInUseCase} from "../../../application/usecases/auth/SignInUseCase";

@injectable()
export class AuthServiceImpl implements SignInUseCase {

    public async login(password: string, user: User) {
        const passwordValid = await this.validatePassword(password, user.password);
        if (passwordValid) { return { token: this.getToken(user) }; }
        return { message: "Incorrect credentials" };
    }

    public getToken(user: User) {
        const tokenData = {
            id: user.id,
            name: user.name,
            username: user.username,
            // tslint:disable-next-line:object-literal-sort-keys
            email: user.email,
        };

        return jwt.sign(tokenData, "APIBlogsEDOMSecret", {
            expiresIn: 60 * 60 * 24,
        });
    }

    public getUser(token: string) {
        return jwt.verify(token, "APIBlogsEDOMSecret", {
            expiresIn: 60 * 60 * 24,
        });
    }

    public async validatePassword(password: string, userPassword: string) {
        return bcrypt.compare(password, userPassword);
    }
}
