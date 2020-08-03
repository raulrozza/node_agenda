module.exports = (req, res, next) => {
    if (!req.session.user) return res.session.save(() => res.redirect('/'));
    return next();
};
