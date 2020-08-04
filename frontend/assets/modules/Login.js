import validator from 'validator';

export default class Login {
    constructor(className) {
        const form = document.querySelector(className);

        if (!form)
            throw new Error(`Could not find form with class ${className}`);

        this.form = form;
    }

    on(eventName, callback) {
        this.form.addEventListener(eventName, event => {
            try {
                callback(event);
            } catch (error) {
                console.error(error);
            }
        });
    }

    static validateSubmit(submitEvent) {
        submitEvent.preventDefault();
        const formElement = submitEvent.target;
        const fields = formElement.querySelectorAll('input');

        fields.forEach(field => {
            if (field.required && !field.value)
                throw new Error(`${field.name} is required!`);

            if (field.type === 'email' && !validator.isEmail(field.value))
                throw new TypeError('Invalid e-mail format');
        });

        submitEvent.submit();
    }
}
