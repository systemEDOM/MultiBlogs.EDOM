import * as express from "express";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../types";

import { UserRepositoryInterface } from "../repository/User/UserRepositoryInterface";
import { AuthService } from "../services/AuthService/AuthService";
import { FindByUsernameUsersUseCaseInterface } from "../usecases/users/contracts/FindByUsernameUsersUseCaseInterface";

@controller("/auth")
export class LoginController extends BaseHttpController {

    @inject(TYPES.FindByUsernameUsersUseCaseInterface)
    public findByUsernameUsersUseCase: FindByUsernameUsersUseCaseInterface;
    private userRepository: UserRepositoryInterface;

    private authService: AuthService;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
                @inject(TYPES.AuthService) authService: AuthService) {
        super();
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @httpPost("/login")
    public async login(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this.findByUsernameUsersUseCase.handle(req.body.username).then(async (user) => {
                // tslint:disable-next-line:no-shadowed-variable
                const response = await this.authService.login(req.body.password, user);
                return res.status(200).json(response);
            });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
