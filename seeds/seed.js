const sequelize = require('../config/connection.js');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        //what is the meaning of individual hooks?
        returning: true,
    });

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comment of commentData) {
        await Comment.create({ 
            ...comment
        })
    }

    // process.exit(0); 
    //what does process.exit mean?
};

seedDatabase();