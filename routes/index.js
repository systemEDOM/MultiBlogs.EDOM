const express = require('express');
const domainRoutes = require('./domain_routes');
const userRoutes = require('./user_routes');

const router = express.Router();

router.use(domainRoutes);
router.use(userRoutes);

module.exports = router;