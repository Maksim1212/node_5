const { Router } = require('express');
const csrf = require('csurf');
const AuthUserComponent = require('../Auth');

const csrfProtection = csrf({ cookie: true });

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/login', csrfProtection, AuthUserComponent.loginPage);

router.post('/login', AuthUserComponent.loginAction);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/register', AuthUserComponent.register);

router.post('/createUser', AuthUserComponent.createUser);

module.exports = router;