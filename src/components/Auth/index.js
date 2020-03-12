const AuthUserService = require('../Auth/service');
const AuthUserValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';

async function register(req, res, next) {
    console.log('register rout Ok');
    return res.render('register.ejs');
}

async function login(req, res, next) {
    console.log('login rout OK');
    return res.render('login.ejs');
}

module.exports = {
    register,
    login,
};