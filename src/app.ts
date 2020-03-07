import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { createConnection } from "typeorm";
import container from "./inversify.config";

import "./infrastructure/controllers/DomainController";
import "./infrastructure/controllers/LoginController";
import "./infrastructure/controllers/PermissionController";
import "./infrastructure/controllers/PostController";
import "./infrastructure/controllers/RoleController";
import "./infrastructure/controllers/UserController";

import {AuthProvider} from "./infrastructure/providers/AuthProvider";

class App {
    private app;
    private server;

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
