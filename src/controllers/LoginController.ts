import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Request, Response, Put, Delete } from "inversify-express-utils";
import TYPES from '../types';


import { UserRepositoryInterface } from '../repository/User/UserRepositoryInterface';
import { FindByUsernameUsersUseCaseInterface } from '../usecases/users/contracts/FindByUsernameUsersUseCaseInterface';

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
            await this.findByUsernameUsersUseCase.handle(req.body.username).then(user => {
                var tokenData = {
                    username: username
                    // ANY DATA
                  }
                
                  var token = jwt.sign(tokenData, 'Secret Password', {
                     expiresIn: 60 * 60 * 24 // expires in 24 hours
                  })
            });
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}