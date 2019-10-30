import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import {createConnection, useContainer, getConnectionManager, ConnectionManager} from "typeorm";
import container from "./inversify.config";
import { InversifyExpressServer, interfaces, TYPE } from "inversify-express-utils";

import './controllers/UserController';
import './controllers/DomainController';
import './controllers/PostController';
import './controllers/LoginController';

import {AuthProvider} from './providers/AuthProvider';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded());

let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app, AuthProvider);

createConnection().then(async connection => {
    console.log("Connected to DB");
    let app = server.build();
    let serve = app.listen(process.env.PORT || 3000, () => console.log(`App running on ${serve.address().port}`));
}).catch(error => console.log(error));