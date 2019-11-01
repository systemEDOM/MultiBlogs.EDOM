import { AuthService } from "./AuthService";
import { User } from "../../entity/User";
import { injectable } from "inversify";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@injectable()
export class AuthServiceImpl implements AuthService {

    public async login(password: string, user: User) {
        let passwordValid = await this.validatePassword(password, user.password);
        if (passwordValid) return { token: this.getToken(user) };
        return { message: "Incorrect credentials" };
    }
    
    public getToken(user: User) {
        var tokenData = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        };
        
        var token = jwt.sign(tokenData, 'APIBlogsEDOMSecret', {
            expiresIn: 60 * 60 * 24,
        });

        return token;
    }

    public getUser(token: string) {
        return jwt.verify(token, 'APIBlogsEDOMSecret', {
            expiresIn: 60 * 60 * 24,
        });
    }

    public async validatePassword(password: string, userPassword: string) {
        return await bcrypt.compare(password, userPassword);
    }
} 