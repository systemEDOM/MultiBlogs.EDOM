import * as express from "express";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../../../types";

import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import { FindByUsernameUserUseCase } from "../../../core/application/usecases/users/FindByUsernameUserUseCase";
import { User } from "../../../infrastructure/entities/User";
import { SignInUseCase } from "../../../core/application/usecases/auth/SignInUseCase";

@controller("/auth")
export class LoginController extends BaseHttpController {

    @inject(TYPES.FindByUsernameUserUseCase)
    public findByUsernameUsersUseCase: FindByUsernameUserUseCase;
    private userRepository: UserRepository;

    private authService: SignInUseCase;

    public constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository,
        @inject(TYPES.SignInUseCase) authService: SignInUseCase) {
        super();
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @httpPost("/login")
    public async login(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this.findByUsernameUsersUseCase.execute(req.body.username).then(async user => {
                const responseLogin = await this.authService.login(req.body.password, user);
                return res.status(200).json(responseLogin);
            });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
