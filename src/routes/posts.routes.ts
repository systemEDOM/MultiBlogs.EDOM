import * as express from 'express';
import container from '../inversify.config';
import { interfaces, TYPE } from 'inversify-express-utils';

let router = express.Router();
let PostController = container.get<interfaces.Controller>(TYPE.Controller);


router.route('/posts').get(PostController.index)
.post(PostController.store);

module.exports =  router;