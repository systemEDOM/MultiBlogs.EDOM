import * as bcrypt from "bcryptjs";
import {injectable} from "inversify";
import * as jwt from "jsonwebtoken";
import {UserDTO} from "../../../domain/entities/UserDTO";
import {SignInUseCase} from "./Contracts/SignInUseCase";

@injectable()
export class SignInUseCaseImpl implements SignInUseCase<UserDTO> {

    public async login(password: string, user: UserDTO): Promise<object> {
        const passwordValid = await this.validatePassword(password, user.password);
        if (passwordValid) { return { token: this.getToken(user) }; }
        return { message: "Incorrect credentials" };
    }

    public getToken(user: UserDTO): string {
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

    public getUser(token: string): Promise<UserDTO> {
        return jwt.verify(token, "APIBlogsEDOMSecret", {
            expiresIn: 60 * 60 * 24,
        });
    }

    public async validatePassword(password: string, userPassword: string): Promise<boolean> {
        return bcrypt.compare(password, userPassword);
    }
}
