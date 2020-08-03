const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: String,
    email: String,
    phone: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(firstname, lastname, email, phone) {
        this.firstname = String(firstname);
        this.lastname = String(lastname);
        this.email = String(email);
        this.phone = String(phone);
        this.errors = [];
    }

    validateFields() {
        if (!this.firstname) this.errors.push('Nome é obrigatório.');
        if (!this.email && !this.phone)
            this.errors.push(
                'Você precisa fornecer pelo menos alguma informação de contato.',
            );
        if (this.email && !validator.isEmail(this.email))
            this.errors.push('E-mail inválido!');
    }

    haveErrors() {
        return this.errors.length > 0;
    }

    async create() {
        this.validateFields();
        if (this.haveErrors()) throw new Error('Validation error.');

        return ContactModel.create({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
        });
    }

    async edit(id) {
        if (typeof id !== 'string') throw new Error('Invalid id');
        this.validateFields();
        if (this.haveErrors()) throw new Error('Validation error.');

        return ContactModel.findByIdAndUpdate(
            id,
            {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                phone: this.phone,
            },
            { new: true },
        );
    }

    static getById(id) {
        if (typeof id !== 'string') throw new Error('Invalid id');
        return ContactModel.findById(id);
    }

    static delete(id) {
        if (typeof id !== 'string') throw new Error('Invalid id');
        return ContactModel.findByIdAndDelete(id);
    }

    static getAll() {
        return ContactModel.find().sort({ createdAt: -1 });
    }
}

module.exports = Contact;
