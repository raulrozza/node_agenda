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

    async validate() {
        if (!validator.isEmail(this.email))
            this.errors.push('E-mail inválido!');

        const userExists = await UserModel.findOne({ email: this.email });
        if (userExists) this.errors.push('Usuário já existe!');
    }

    async create() {
        await this.validate();

        if (this.errors.length > 0) throw new Error('Validation error.');

        const salt = bcryptjs.genSaltSync();

        return UserModel.create({
            email: this.email,
            password: bcryptjs.hashSync(this.password, salt),
        });
    }
}

module.exports = User;
