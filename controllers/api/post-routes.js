const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require("../../utils/auth");
const sequelize = require('../../config/connection');

// get all users
router.get('/', (req, res) => {
    // console.log('======================');
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
          'id',
          'post_comment',
          'title',
          'created_at'],

        include: [
          
          {
            model: Comment,
            attributes: ['id', 
            'comment_text', 
            'post_id', 
            'user_id', 
            'created_at'
          ],
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
    });
  

router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 
      'post_comment', 
      'title', 
      'created_at'
    ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

  router.post('/', (req, res) => {
    
    // console.log('making post')
    // console.log(req.body)
    Post.create({
      title: req.body.title,
      post_comment: req.body.post_comment,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  //UPDATE POST
  router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//DELETE POST

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

  // Post.create({
  //   title: req.body.title,
  //   post_url: req.body.post_comment,
  //   user_id: req.session.user_id
  // })

module.exports = router;