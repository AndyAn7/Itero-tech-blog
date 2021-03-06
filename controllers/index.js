const router = require('express').Router();

const api = require('./api');
const home = require('./homeroutes');
const dash = require('./dashroutes');

router.use('/api', api);
router.use('/', home);
router.use('/dashboard', dash);

module.exports = router;