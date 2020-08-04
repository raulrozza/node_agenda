import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './assets/modules/Login';

const sign = new Login('.form-sign');
const register = new Login('.form-register');

sign.on('submit', Login.validateSubmit);
register.on('submit', Login.validateSubmit);
