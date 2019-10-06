import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Request, Response, Put, Delete } from "inversify-express-utils";
import TYPES from '../types';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


import { UserRepositoryInterface } from '../repository/User/UserRepositoryInterface';
import { FindByUsernameUsersUseCaseInterface } from '../usecases/users/contracts/FindByUsernameUsersUseCaseInterface';
import { User } from '../entity/User';

@injectable()
@Controller("/auth")
export class LoginController implements interfaces.Controller {
    private userRepository: UserRepositoryInterface;

    @inject(TYPES.FindByUsernameUsersUseCaseInterface)
    findByUsernameUsersUseCase: FindByUsernameUsersUseCaseInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    @Post("/login")
    public async store (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            await this.findByUsernameUsersUseCase.handle(req.body.username).then(async user => {
                let passwordValid = await this.validatePassword(req.body.password, user.password);
                let response = (passwordValid) ? { token: this.getToken(user) } : { message: "Invalid credentials" };

                return res.status(200).json(response);
            });
        } catch(error) {
            res.status(400).json(error);
        }
    }

    private async validatePassword(password: string, userPassword: string) {
        return await bcrypt.compare(password, userPassword);
    }

    private getToken(user: User) : any {
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
}