import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import {createConnection, useContainer, getConnectionManager, ConnectionManager} from "typeorm";
import container from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import * as multer from 'multer';

const app = express();
const upload = multer({ dest: 'public/assets/img/blog/' }).single('avatar');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());


app.post('/prueba', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }
  
      // Everything went fine.
      res.send(req.body );
    })
  })


let router = express.Router();

let server =  new InversifyExpressServer(container, router, { rootPath: "/api" }, app);

createConnection().then(async connection => {
    console.log("Connected to DB");
    let app = server.build();
    let serve = app.listen(process.env.PORT || 3000, () => `App running on ${serve.address().port}`);
}).catch(error => console.log(error));