import * as express from "express";
import domainRoutes from './domain_routes';
//import userRoutes  from './user_routes';

const router = express.Router();

router.use(domainRoutes);
//router.use(userRoutes);

export default router;