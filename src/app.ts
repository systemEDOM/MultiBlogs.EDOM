import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import {createConnection} from "typeorm";
import routes from './routes/index';

createConnection().then(async connection => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride('_method'));

    //use routes
    app.use('/api', routes);

    let server = app.listen(process.env.PORT || 3000, () => `App running on ${server.address().port}`);
}).catch(error => console.log(error));