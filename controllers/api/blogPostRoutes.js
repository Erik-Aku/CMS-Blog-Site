const router = require("express").Router();
const { BlogPost, User, BlogComments } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// creates a new blog post
router.post('/', withAuth, (req, res) => {
    BlogPost.create({
      blog_title: req.body.blog_title,
      blog_content: req.body.blog_content,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Updates a blogpost 
router.put('/:id', withAuth, (req, res) => {
    BlogPost.update({
        blog_title: req.body.blog_title,
        blog_content: req.body.blog_content
      },
      {
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

  // deletes a blog post
  router.delete('/:id', withAuth, (req, res) => {
    BlogPost.destroy({
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

module.exports = router;