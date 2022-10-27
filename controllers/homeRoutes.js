const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment
          // attributes: ['title', 'bodyContent', 'date_created', 'user_id'],
          // includes: [
          //   {
          //     model: User,
          //     attributes: ['name'],
          //   }
          // ]
        }
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post)

    // const commentData = await Comment.findByPk(req.params.id)
    // const comment = commentData.get({plain: true});
    // console.log(comment)
    // const commentData = await Comment.findAll({
    //   where: {
    //     post_id: req.params.id,
    //   }
    // });

    // const comment = commentData.get({ plain: true });
    // console.log(comment)
    // console.log(commentData)


    res.render('post', {
      // ...comment,
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login', {
    logged_in: req.session.logged_in
  })
})

module.exports = router;
