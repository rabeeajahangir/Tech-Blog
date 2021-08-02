const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.use('/', homeRoutes);


module.exports = router;