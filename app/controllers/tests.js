var testsController = {
    tests: {
        get: function (req, res, next) {
            //if (req.params.id) {
                res.render('tests.html', {title: 'The Site', id: req.params.id || 1}); // set id to default of 1
                //next(); // todo next throws a headers already sent
            //} else {
                //res.redirect('/')
                //console.log('here');
            //}
        }
    }
};

module.exports = testsController;