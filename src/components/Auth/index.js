const bcrypt = require('bcrypt');
// const passport = require('passport');
const jwt = require('jsonwebtoken');

const AuthUserService = require('../Auth/service');
const AuthUserValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';
const saltRounds = 10;

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */

async function getAccesToken(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = await AuthUserService.findUser({ _id: req.body.id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function createUser(req, res, next) {
    try {
        const { error } = AuthUserValidation.createUser(req.body);
        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        req.body.token = await AuthUserService.generateAuthTpken;
        // const token = await getAccesToken(req.body.user.id);
        await AuthUserService.createUser(req.body);

        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.redirect('register');
        }
        if (error.name === 'MongoError') {
            req.flash('error', { message: dbError });
            return res.redirect('register');
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function loginPage(req, res, next) {
    console.log('login rout OK');
    return res.render('login.ejs');
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function loginAction(req, res, next) {
    try {
        const { error } = AuthUserValidation.loginAction(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthUserService.findUser(req.body.email);
        if (error || !user) {
            console.log('user not found');
        }
        if (!error && user) {
            const reqPassword = req.body.password;
            const userPassword = user.password;
            const passwordsMatch = await bcrypt.compare(reqPassword, userPassword);

            if (passwordsMatch) {
                // const token = await getAccesToken(user.id);

                return res.status(200).json({
                    data: {
                        user,
                        // token,
                    },
                });
            }
        } else {
            console.log('user dont found');
        }

        return res.status(200);
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.redirect('/v1/users');
        }

        if (error.name === 'MongoError') {
            console.log(req.flash('error', { message: defaultError }));
            return res.redirect('/v1/users');
        }

        return next(error);
    }
}

module.exports = {
    register,
    createUser,
    loginPage,
    loginAction,
};
