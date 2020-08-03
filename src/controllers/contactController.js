const Contact = require('../models/Contact');

module.exports = {
    index: (_, res) => {
        return res.render('contact');
    },
    editIndex: async (req, res) => {
        if (!req.params.id) return res.render('notfound');
        try {
            const contact = await Contact.getById(req.params.id);

            return res.render('contact', { contact });
        } catch (error) {
            req.flash('errors', 'Houve um erro.');
            return req.session.save(() => {
                return res.redirect('notfound');
            });
        }
    },
    register: async (req, res) => {
        const { firstname, lastname, email, phone } = req.body;

        const contact = new Contact(firstname, lastname, email, phone);

        try {
            const result = await contact.create();

            req.flash('success', 'Contato alterado com sucesso!');
            return req.session.save(() => {
                return res.redirect(`/contact/${result._id}`);
            });
        } catch (error) {
            req.flash('errors', contact.errors);
            return req.session.save(() => {
                return res.redirect('back');
            });
        }
    },
    edit: async (req, res) => {
        const { _id, firstname, lastname, email, phone } = req.body;

        const contact = new Contact(firstname, lastname, email, phone);

        try {
            const result = await contact.edit(_id);

            req.flash('success', 'Contato cadastrado com sucesso!');
            return req.session.save(() => {
                return res.redirect(`/contact/${result._id}`);
            });
        } catch (error) {
            req.flash('errors', contact.errors);
            return req.session.save(() => {
                return res.redirect('back');
            });
        }
    },
    delete: async (req, res) => {
        if (!req.params.id) return res.render('notfound');
        try {
            await Contact.delete(req.params.id);

            req.flash('success', 'Contato apagado com sucesso!');
            return req.session.save(() => {
                return res.redirect(`back`);
            });
        } catch (error) {
            req.flash('errors', 'Houve um erro.');
            return req.session.save(() => {
                return res.redirect('notfound');
            });
        }
    },
};
