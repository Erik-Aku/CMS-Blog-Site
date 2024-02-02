const router = require("express").Router();
const sequelize = require('../config/connection');
const { BlogPost, User, BlogComments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    BlogPost.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'blog_title',
        'created_at',
        'blog_content'
      ],
      include: [
        {
          model: BlogComments,
          attributes: ['id', 'comment_text', 'blog_post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        },
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const blogpost = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { blogpost, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  

router.get('/create', withAuth, (req, res) => {
    BlogPost.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'blog_title',
        'created_at',
        'blog_content'
      ],
      include: [
        {
          model: BlogComments,
          attributes: ['id', 'comment_text', 'blog_post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        },
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const blogpost = dbPostData.map(post => post.get({ plain: true }));
        res.render('create-blog-post', { blogpost, logged_in: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    BlogPost.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'blog_title',
        'created_at',
        'blog_content'
      ],
      include: [
        {
          model: BlogComments,
          attributes: ['id', 'comment_text', 'blog_post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        },
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const blogPost = dbPostData.get({ plain: true });

        res.render('edit-blog-post', {
            blogPost,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});



module.exports = router;