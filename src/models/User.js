const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(email, password) {
        this.email = String(email);
        this.password = String(password);
        this.errors = [];
    }

    validateFields() {
        if (!validator.isEmail(this.email))
            this.errors.push('E-mail inválido!');
    }

    haveErrors() {
        return this.errors.length > 0;
    }

    async checkUserExists() {
        const userExists = await UserModel.findOne({ email: this.email });
        if (userExists) this.errors.push('Usuário já existe!');
    }

    async create() {
        this.validateFields();
        if (this.haveErrors()) throw new Error('Validation error.');

        await this.checkUserExists();
        if (this.haveErrors()) throw new Error('Validation error.');

        const salt = bcryptjs.genSaltSync();

        return UserModel.create({
            email: this.email,
            password: bcryptjs.hashSync(this.password, salt),
        });
    }

    async sign() {
        this.validateFields();
        if (this.haveErrors()) throw new Error('Validation error.');

        const user = await UserModel.findOne({ email: this.email });

        if (!user || bcryptjs.compareSync(this.password, user.password)) {
            this.errors.push('Usuário ou senha incorretos.');
            throw new Error('Incorrect credentials.');
        }
    }
}

module.exports = User;
