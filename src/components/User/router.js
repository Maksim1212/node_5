const { Router } = require('express');
const csrf = require('csurf');
const UserComponent = require('../User');
const { isAuthJWT } = require('../../polices/isAuth');

const csrfProtection = csrf({ cookie: true });

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const userRouter = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// userRouter.get('/', isAuthPasport, csrfProtection, UserComponent.findAll);
userRouter.get('/', isAuthJWT, csrfProtection, UserComponent.findAll);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
userRouter.get('/:id', csrfProtection, UserComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
// router.post('/create', UserComponent.create);
userRouter.post('/', isAuthJWT, csrfProtection, UserComponent.create);
/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
userRouter.put('/', csrfProtection, UserComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
userRouter.delete('/', csrfProtection, UserComponent.deleteById);

module.exports = userRouter;
