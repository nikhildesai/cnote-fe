var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.redirect('/pages/home'); 
});

router.get('/pages/home', function(req, res) {
  res.render('home');
});

router.get('/pages/about_you', function(req, res) {
  res.render('about_you');
});

router.post('/forms/about_you', function(req, res) {
  console.log('account balance=' + req.body.accountBalance);
  console.log('monthly expenses=' + req.body.monthlyExpenses);
  console.log('credit card payment=' + req.body.creditCardMonthlyPayment);
  console.log('student debt payment=' + req.body.studentDebtMonthlyPayment);
  console.log('has retirement? ' + req.body.hasRetirementAccount);
  var calculatedYearlyAmount;
  if (req.body.accountBalance) {
    var intRate=5; //hard-coded for now    
    calculatedYearlyAmount = parseFloat((req.body.accountBalance*intRate*1)/100).toFixed(2); // 1 year
  }
  res.render('offer', 
    { 'accountBalance': req.body.accountBalance, 
      'calculatedYearlyAmount': calculatedYearlyAmount
    }
  );
});

router.get('/pages/offer', function(req, res) {
  res.redirect('/pages/about_you');
});

module.exports.router = router;
