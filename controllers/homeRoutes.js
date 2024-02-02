const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');
const { BlogPost, User, BlogComments} = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                    include: {
                        model: BlogComments,
                        attributes: ['id', 'comment_text', 'blog_post_id', 'user_id', 'created_at'],
                    }
                },

            ],
        });
        const blogPost = blogPostData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            blogPost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard/create');
      return;
    }
  
    res.render('login', {logged_in: req.session.logged_in});
  });


  router.get('/post/:id', (req, res) => {
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
  
        // pass data to template
        res.render('single-blog-post', {
            blogPost,
            logged_in: req.session.logged_in
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;


