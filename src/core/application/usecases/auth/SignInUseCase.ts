import * as bcrypt from "bcrypt";
import {injectable} from "inversify";
import * as jwt from "jsonwebtoken";
import {UserDTO} from "../../../domain/entities/UserDTO";

@injectable()
export class SignInUseCase {

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
        return await bcrypt.compare(password, userPassword);
    }
}
