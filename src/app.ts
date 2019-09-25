import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import {createConnection, useContainer, getConnectionManager, ConnectionManager} from "typeorm";
import container from "./inversify.config";
import { InversifyExpressServer, interfaces, TYPE } from "inversify-express-utils";
import * as multer from 'multer';
import * as router from './routes';
import { PostController } from "./controllers/PostController";

const app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets/img/blog/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
   
var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());
//app.use('/api', router);
let router = express.Router();
let PostController = container.get<PostController>(TYPE.Controller);


router.route('/posts').get(PostController.index)
.post(PostController.store);

app.post('/uploadfile', (req, res) => {
    let prueba = upload.single('myFile');
    prueba (req, res, async (error) => {
        const file = req.body.myFile;
        res.send(file);
    });
})

let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);

createConnection().then(async connection => {
    console.log("Connected to DB");
    let app = server.build();
    let serve = app.listen(process.env.PORT || 3000, () => `App running on ${serve.address().port}`);
}).catch(error => console.log(error));