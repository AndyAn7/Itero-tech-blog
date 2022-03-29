const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

const user = require('./user.json');
const post = require('./post.json');
const comment = require('./comment.json');

const seed = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(user, {
        individualHooks: true,
        returning: true
    });

    for (const posts of post) {
        await Post.create({
            ...posts,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })};

    for (const comments of comment) {
        await Comment.create({
            ...comments,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })};

        process.exit(0);
};

seed();