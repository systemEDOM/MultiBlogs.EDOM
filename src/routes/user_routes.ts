const express = require('express');
const UserController = require('../controllers/user.controller');

let router = express.Router();

router.route('/users').get(UserController.index)
                    .post(UserController.store);
                        
router.route('/users/:id').get(UserController.show)
                        .put(UserController.update)
                        .delete(UserController.destroy);

router.route('/users/by/:username').get(UserController.showByUsername);


export default router;