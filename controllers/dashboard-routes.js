const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');




router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_comment',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const postsData = dbPostData.map(post => post.get({ plain: true }));
        const posts = postsData.map(post => {
          let temp = post.post_comment.split("\n");
          post.post_comment = temp;
          return post;
        })
        const theuser = req.session.username
        res.render('dashboard', { posts, loggedIn: true, theuser });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;