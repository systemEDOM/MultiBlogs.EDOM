import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import {createConnection, useContainer} from "typeorm";
import container from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";

createConnection().then(async connection => {
    let server = new InversifyExpressServer(container);
    
    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(methodOverride('_method'));
    });

    let app = server.build();
    let serve = app.listen(process.env.PORT || 3000, () => `App running on ${serve.address().port}`);
}).catch(error => console.log(error));