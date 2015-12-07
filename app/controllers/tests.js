var testsController = {
    tests: {
        get: function (req, res, next) {
            if (req.params.id) {
                res.render('tests.html', { title: 'The Site', id: req.params.id });
                next();
            } else {
                //res.redirect('/')
                console.log('here');
            }
        }
    }
};

module.exports = testsController;