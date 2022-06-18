const withAuth = (req, res, next) => {
    if (!req.session.login_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;