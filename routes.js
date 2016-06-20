var express = require('express');
var router = express.Router();
var userEmailSignUp = require('./database.js').userEmailSignUp;
var friendEmailSignUp = require('./database.js').friendEmailSignUp;

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.render('home');
});

router.post('/sign_up', function(req, res) {
  var userEmail =  req.body.email;
  console.log(JSON.stringify(req.body));
  if (!isEmail(userEmail)) {
    console.log('Invalid email: ' + userEmail);
    res.status(400).send({'error': 'Please enter a valid email'});
    return;
  }

  console.log('Registering email: ' + userEmail);
  userEmailSignUp(userEmail, function(err, result) {
    if (err) {
      console.log('Error Registering email: ' + userEmail + ' err:' + err);
      res.status(500).send({'error': 'Unable to sign up, please try again later'});
      return;
    } else {
      res.status(200).send({ 'success': 'Thanks for signing up! We will be in touch shortly!' });
    }
  });

});

router.post('/friend_sign_up', function(req, res) {
  var friendEmail =  req.body.friendEmail;
  var referrerEmail =  req.body.referrerEmail;

  if (!isEmail(friendEmail)) {
    console.log('Invalid friend email: ' + friendEmail);
    res.status(400).send({'error': 'Please enter a valid email'});
    return;
  }

  console.log('Registering email: ' + friendEmail + ' with referrer: ' + referrerEmail);
  friendEmailSignUp(friendEmail, referrerEmail, function(err, result) {
    if (err) {
      console.log('Error Registering friend\'s email: ' + friendEmail + ' err:' + err);
      res.status(500).send({'error': 'Unable to sign up friend, please try again later'});
      return;
    } else {
      res.status(200).send({ 'success': 'Thanks for signing up your friend! We will be in touch shortly!' });
    }
  });

});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};


module.exports.router = router;
