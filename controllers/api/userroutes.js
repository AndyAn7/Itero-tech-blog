const router = require('express').Router();
const {User} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);

        // console.log(user);

        req.session.user_id = user.id;
        req.session.logged_in = true;

        req.session.save(() => {
        res.status(200).json(user);
        });

    } catch (err) {
        res.status(500).json({
        message: 'Please enter a valid email and password of at least 8 characters.'
        });
        return;
    }});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }});

        if (!user) {
            res.status(401).json({
                message: 'Invalid credentials'});
                return;
        }

        const pWord = await user.checkPassword(req.body.password);

        if (!pWord) {
            res.status(401).json({
                message: 'Invalid credentials'});
                return;
        }

        req.session.user_id = user.id;
        req.session.logged_in = true;

        req.session.save(() => {
            res.json({user: user, message: 'Logged in'});
        });

    } catch (err) {
        res.status(500).json(err);
    }});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(401).end();
    }});

module.exports = router;