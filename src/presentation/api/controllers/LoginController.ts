import * as express from "express";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../../../types";

import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import { SignInUseCase } from "../../../core/application/usecases/auth/Contracts/SignInUseCase";
import { FindByUsernameUserUseCase } from "../../../core/application/usecases/users/Contracts/FindByUsernameUserUseCase";

@controller("/auth")
export class LoginController extends BaseHttpController {

    @inject(TYPES.FindByUsernameUsersUseCaseInterface)
    public findByUsernameUsersUseCase: FindByUsernameUserUseCase<any>;
    private userRepository: UserRepository;

    private authService: SignInUseCase<any>;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository,
                @inject(TYPES.AuthService) authService: SignInUseCase<any>) {
        super();
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @httpPost("/login")
    public async login(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this.findByUsernameUsersUseCase.execute(req.body.username).then(async (user) => {
                // tslint:disable-next-line:no-shadowed-variable
                const response = await this.authService.login(req.body.password, user);
                return res.status(200).json(response);
            });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
