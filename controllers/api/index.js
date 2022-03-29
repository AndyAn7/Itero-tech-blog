const router = require('express').Router();
const userR = require('./userroutes');
const postR = require('./postroutes');
const commentR = require('./commentroutes');

router.use('/users', userR);
router.use('/posts', postR);
router.use('/comments', commentR);

module.exports = router;