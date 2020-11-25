const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/signup', (req,res) => {            //when call the /signup
  res.render('signup');                       //render hbs 'signup'
});


router.get('/login', (req,res) => {            //when call the /signup
  res.render('login');                       //render hbs 'signup'
});

module.exports = router;