import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import TYPES from '../types';



import { UserRepositoryInterface } from '../repository/User/UserRepositoryInterface';
import { FindByUsernameUsersUseCaseInterface } from '../usecases/users/contracts/FindByUsernameUsersUseCaseInterface';
import { User } from '../entity/User';
import { AuthService } from '../services/AuthService/AuthService';

@controller("/auth")
export class LoginController extends BaseHttpController {
    private userRepository: UserRepositoryInterface;

    private authService: AuthService;

    @inject(TYPES.FindByUsernameUsersUseCaseInterface)
    findByUsernameUsersUseCase: FindByUsernameUsersUseCaseInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
                @inject(TYPES.AuthService) authService: AuthService) {
        super();
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @httpPost("/login")
    public async login (@request() req: express.Request, @response() res: express.Response) {
        try {
            await this.findByUsernameUsersUseCase.handle(req.body.username).then(async user => {
                let response = await this.authService.login(req.body.password, user);
                return res.status(200).json(response);
            });
        } catch(error) {
            res.status(400).json(error);
        }
    }
}