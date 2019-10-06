import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { AuthService } from "../services/AuthService/AuthService";

import * as express from 'express';
import { Principal } from "./Principal";
import TYPES from "../types";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

    @inject(TYPES.AuthService)
    _authService: AuthService;

    public async getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<interfaces.Principal> {
        let token = req.headers['authorization'];
        if (token) {
            token = token.replace('Bearer ', '');

            const user = this._authService.getUser(token);
            const principal = new Principal(user);

            return principal;
        }

        return null;
    }

}