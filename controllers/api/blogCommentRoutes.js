const router = require("express").Router();
const {BlogComments} = require('../../models');
const withAuth = require('../../utils/auth');

// saves comments in db
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
      BlogComments.create({
        comment_text: req.body.comment_text,
        blog_post_id: req.body.blog_post_id,
        // use the id from the session
        user_id: req.session.user_id,
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

  // displays blog comments
  router.get('/', (req, res) => {
    BlogComments.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;