const Contact = require('../models/Contact');

module.exports = {
    index: async (req, res) => {
        try {
            const contacts = await Contact.getAll();

            return res.render('index', { contacts });
        } catch (error) {
            req.flash('errors', 'Houve um erro.');
            return req.session.save(() => {
                return res.redirect('notfound');
            });
        }
    },
};
