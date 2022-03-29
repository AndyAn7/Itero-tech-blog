const router = require('express').Router();
const {Post, User, Comment} = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Post}]
            });

        const users = user.get({plain: true});

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }});

router.get('/', auth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }})
        .then(post => {
            const posts = post.map((post) => post.get({plain: true}));

            res.render('dashboard', {
                posts,
                logged_in: true
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('login');
        })});

router.post('/', auth, async (req, res) => {
    try {
        const post = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json(err);
    }});

module.exports = router;