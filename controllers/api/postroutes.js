const router = require('express').Router();
const {Post, User, Comment} = require('../../models');
const auth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
            attributes: [
                'id', 
                'title', 
                'content', 
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'post_comment',
                        'post_id',
                        'user_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }}]});

            const posts = post.map((posted) => posted.get({plain: true}));
            
            res.render('post', {posts});

    } catch (error) {
        res.status(500).json(err);
    }});

router.post('/', auth, async (req, res) => {
    try {
        const posts = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(201).json(posts);

    } catch (error) {
        res.status(500).json(err);
    }});

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }});

        if (!post) {
            res.status(404).json({message: 'Post not found'});
            return;
        }

        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }});

router.put('/:id', auth, async (req, res) => {
    try {
        const post = await Post.update( 
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }});
            
        if (!post) {
            res.status(404).json({message: 'Post not found'});
            return;
        }

        res.status(200).json(post);
        
    } catch (err) {
        res.status(500).json(err);
    }});

module.exports = router;