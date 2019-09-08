const express = require('express');
const DomainController = require('../controllers/domain.controller');

let router = express.Router();

router.route('/domains').get(DomainController.index)
                        .post(DomainController.store);
                        
router.route('/domains/:id').get(DomainController.show)
                            .put(DomainController.update)
                            .delete(DomainController.destroy);


module.exports = router;