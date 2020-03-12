const bcrypt = require('bcrypt');

const AuthUserService = require('../Auth/service');
const AuthUserValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';
const saltRounds = 10;

async function register(req, res, next) {
    try {
        console.log('register rout Ok');
        return res.render('register.ejs', {
            // csrfToken: req.csrfToken(),
            errors: req.flash('error'),
        });
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const { error } = AuthUserValidation.createUser(req.body);
        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = await bcrypt.hash(req.body.password, saltRounds);

        await AuthUserService.createUser(req.body);

        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            console.log('sdsdsd');
            return res.redirect('register');
        }
        if (error.name === 'MongoError') {
            req.flash('error', { message: dbError });
            return res.redirect('register');
        }
        return next(error);
    }
}

async function loginPage(req, res, next) {
    console.log('login rout OK');
    return res.render('login.ejs');
}

async function loginAction(req, res, next) {
    return console.log('loginAction');
}

module.exports = {
    register,
    createUser,
    loginPage,
    loginAction,
};