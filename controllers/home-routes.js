const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');





router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'post_comment',
        'title',
        'created_at',
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

        // console.log(dbPostData[0]);

        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', { posts });

      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;