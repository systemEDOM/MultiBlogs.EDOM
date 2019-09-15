import * as express from "express";
import {DomainController} from '../controllers/domain.controller';


let router = express.Router();

router.route('/domains').get(DomainController.index)
                        .post(DomainController.store);
                        
router.route('/domains/:id').get(DomainController.show)
                            .put(DomainController.update)
                            .delete(DomainController.destroy);

export default router;