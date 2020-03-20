import {inject, injectable} from "inversify";
import {interfaces} from "inversify-express-utils";

import * as express from "express";
import TYPES from "../../types";
import {Principal} from "./Principal";
import { SignInUseCase } from "../../core/application/usecases/auth/SignInUseCase";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(TYPES.SignInUseCase)
    public authUseCase: SignInUseCase;

    public async getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<interfaces.Principal> {
        let token = req.headers.authorization;
        if (token) {
            token = token.replace("Bearer ", "");

            const user = await this.authUseCase.getUser(token);
            return new Principal(user);
        }

        return null;
    }

}
