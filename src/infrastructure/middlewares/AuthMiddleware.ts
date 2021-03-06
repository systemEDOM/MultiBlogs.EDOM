import * as express from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    public handler(req: express.Request, res: express.Response, next: express.NextFunction): express.Response {
        if (this.httpContext.user === null) {
            return res.status(401).send({
                message: "You haven't logged in",
            });
        }
        next();
    }
}
