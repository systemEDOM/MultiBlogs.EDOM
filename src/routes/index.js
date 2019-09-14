
import * as domainRoutes from './domain_routes';
import userRoutes  from './user_routes';

const router = express.Router();

router.use(domainRoutes);
router.use(userRoutes);

module.exports = router;