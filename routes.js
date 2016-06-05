var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.render('about_you');
});

router.post('/sign_up', function(req, res) {
  console.log('Email=' + req.body.inputEmail);

  if (!!!req.body.inputEmail) {
    res.render('about_you', {'error': 'Please enter a valid email'});
    return;    
  }
  res.render('about_you', 
    { 'success': 'Thanks for signing up! We will be in touch shortly!' 
    }
  );
});

module.exports.router = router;
