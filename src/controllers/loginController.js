const User = require('../models/User');

module.exports = {
    index: (req, res) => {
        if (req.session.user) return res.redirect('/');
        return res.render('login');
    },
    register: async (req, res) => {
        const { email, password } = req.body;

        const user = new User(email, password);

        try {
            await user.create();

            req.flash('success', 'Usuário cadastrado com sucesso!');
            return req.session.save(() => {
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('errors', user.errors);
            return req.session.save(() => {
                return res.redirect('back');
            });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        const user = new User(email, password);

        try {
            await user.sign();

            req.session.user = user;
            return req.session.save(() => {
                return res.redirect('/');
            });
        } catch (error) {
            req.flash('errors', user.errors);
            return req.session.save(() => {
                return res.redirect('back');
            });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
};
