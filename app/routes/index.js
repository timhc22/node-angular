var express = require('express');
var router = express.Router();

// Controllers
var testsController = require('../controllers/tests');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html', { title: 'The Site' });
});

// Test route
router.route('/tests/:id?') // the ? makes the parameter optional
    .get(testsController.tests.get);
    //.post(testsController.test.post)

module.exports = router;