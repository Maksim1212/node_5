const { Router } = require('express');
const csrf = require('csurf');
const AuthUserComponent = require('../Auth');
const Auth = require('../../polices/isAuth');

const csrfProtection = csrf({ cookie: true });

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const authUserRouter = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/login', csrfProtection, AuthUserComponent.loginPage);

authUserRouter.post('/login', csrfProtection, AuthUserComponent.login);

authUserRouter.get('/logout', AuthUserComponent.logout);

authUserRouter.get('/401', AuthUserComponent.anauthorized);

authUserRouter.get('/403', AuthUserComponent.forbidden);

authUserRouter.get('/private', AuthUserComponent.passport);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/register', csrfProtection, AuthUserComponent.register);

authUserRouter.post('/createUser', csrfProtection, AuthUserComponent.createUser);

authUserRouter.post('/updateToken', Auth.isAuthJWT);

module.exports = authUserRouter;
