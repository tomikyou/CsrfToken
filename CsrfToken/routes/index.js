// ここから追記==================================
var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
// ここまで追記==================================

var express = require('express');
var router = express.Router();

var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 以下追記=========================================================
router.get('/login', csrfProtection, function(req, res) {
  // csrfToken付きでページを返す
  res.render('login', { csrfToken: req.csrfToken() })
});

router.get('/login_evil', csrfProtection, function(req, res) {
  // csrfToken無しでページを返す
  res.render('login_evil')
});

router.post('/login', parseForm, csrfProtection, function(req, res) {
  res.render('index', { certification: 'ok' })
});
// ここまで========================================================

module.exports = router;
