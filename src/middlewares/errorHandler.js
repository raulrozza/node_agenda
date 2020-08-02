module.exports = (error, _, res, next) => {
    if (error) return res.render('notfound');

    next();
};
