import * as express from 'express';
import * as postRoutes from './posts.routes';

let router = express.Router();
router.use(postRoutes);

module.exports = router;