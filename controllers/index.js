const router = require('express').Router();

const withAuth = require('../utils/auth');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', withAuth, apiRoutes);
router.use('/', withAuth, homeRoutes);

module.exports = router;