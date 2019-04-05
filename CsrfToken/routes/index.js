// ��������ǋL==================================
var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
// �����܂ŒǋL==================================

var express = require('express');
var router = express.Router();

var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// �ȉ��ǋL=========================================================
router.get('/login', csrfProtection, function(req, res) {
  // csrfToken�t���Ńy�[�W��Ԃ�
  res.render('login', { csrfToken: req.csrfToken() })
});

router.get('/login_evil', csrfProtection, function(req, res) {
  // csrfToken�����Ńy�[�W��Ԃ�
  res.render('login_evil')
});

router.post('/login', parseForm, csrfProtection, function(req, res) {
  res.render('index', { certification: 'ok' })
});
// �����܂�========================================================

module.exports = router;
