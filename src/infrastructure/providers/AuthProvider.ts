import {inject, injectable} from "inversify";
import {interfaces} from "inversify-express-utils";
import {SignInUseCase} from "../../core/application/usecases/auth/Contracts/SignInUseCase";

import * as express from "express";
import TYPES from "../../types";
import {Principal} from "./Principal";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(TYPES.AuthService)
        // tslint:disable-next-line:variable-name
    public _authService: SignInUseCase<any>;

    // tslint:disable-next-line:max-line-length
    public async getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<interfaces.Principal> {
        let token = req.headers.authorization;
        if (token) {
            token = token.replace("Bearer ", "");

            const user = this._authService.getUser(token);
            return new Principal(user);
        }

        return null;
    }

}