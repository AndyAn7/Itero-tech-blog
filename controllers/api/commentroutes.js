const router = require('express').Router();
const {Comment, Post, User} = require('../../models');
const auth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findAll({});

        const comments = comment.map((commented) => commented.get({plain: true}));

    } catch (err) {
        res.status(500).json(err);
    }});

router.post('/', auth, async (req, res) => {
    try {
        const newC = await Comment.create ({
            post_comment: req.body.post_comment,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(newC);
    } catch (err) {
        res.status(500).json(err);
    }});

router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
    }});

        if (!comment) {
            res.status(404).json({message: 'No comment with that ID'});
            return;
        }

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }});

module.exports = router;