const router = require('express').Router();

res.render('homepage', {
  posts,
  loggedIn: req.session.loggedIn
});

router.use('/', homeRoutes);


module.exports = router;