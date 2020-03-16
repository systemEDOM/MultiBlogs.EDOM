import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { createConnection } from "typeorm";
import container from "./inversify.config";

import "./presentation/api/controllers/DomainController";
//import "./presentation/api/controllers/LoginController";
//import "./presentation/api/controllers/PermissionController";
//import "./presentation/api/controllers/PostController";
//import "./presentation/api/controllers/RoleController";
//import "./presentation/api/controllers/UserController";

import {Express} from "express";
import {AuthProvider} from "./infrastructure/providers/AuthProvider";

class App {
    private app: Express;
    private server: InversifyExpressServer;

    constructor() {
        this.initExpress();
    }

    public initExpress() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.urlencoded());

        this.server =  new InversifyExpressServer(container, null,
            {
                rootPath: "/api",
            }, this.app, AuthProvider);
        this.mount();
    }

    private mount() {
        createConnection().then(async (connection) => {
            console.log("Connected to DB");
            const build = this.server.build();
            const serveRunning = build.listen(process.env.PORT || 3000, () => console.log(`App running on ${serveRunning.address().port}`));
        }).catch((error) => console.log(error));
    }
}

export default new App();
