const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');

// const { BlogPost, BlogComments, User } = require("../models");

router.get("/", async (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login', {logged_in: req.session.logged_in});
  });



module.exports = router;

// router.get('/', async (req, res) => {
//     try {
//         const blogPostData = await BlogPost.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                     include: {
//                         model: BlogComments,
//                         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     }
//                 },

//             ],
//         });
//         const blogPost = blogPostData.map((post) => post.get({plain: true}));

//         res.render('homepage', {
//             blogPost,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
