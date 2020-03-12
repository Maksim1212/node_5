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
router.get('/login', AuthUserComponent.login);

// router.get('/login', csrfProtection, AuthUserComponent.login);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/register', AuthUserComponent.register);
// router.get('/register', csrfProtection, AuthUserComponent.register);
module.exports = router;