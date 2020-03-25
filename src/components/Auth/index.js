const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthUserService = require('../Auth/service');
const AuthUserValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');
const { getUserMainFields } = require('../../helpers/user');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';
const userNotFound = 'This Email not found';
const wrongPassword = 'Wrong Password';
const saltRounds = 10;

async function getJWTTokens(user) {
    console.log(user);
    const accessToken = jwt.sign({ user }, process.env.JWT_Secret_KEY, { expiresIn: 5 });
    const refreshToken = jwt.sign({}, process.env.JWT_Secret_KEY, { expiresIn: '2d' });

    await AuthUserService.updateRefreshToken(user, refreshToken);
    return {
        accessToken,
        refreshToken,
    };
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
function register(req, res, next) {
    try {
        //  console.log('register rout Ok');
        return res.render('register.ejs', {
            csrfToken: req.csrfToken(),
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
        await AuthUserService.createUser(req.body);

        return res.redirect('/v1/auth/login/');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.redirect('/v1/auth/register/');
        }
        if (error.name === 'MongoError') {
            req.flash('error', { message: dbError });
            return res.redirect('/v1/auth/register/');
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
function loginPage(req, res, next) {
    try {
        return res.status(200).render('login.ejs', {
            csrfToken: req.csrfToken(),
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
async function login(req, res, next) {
    try {
        const { error } = AuthUserValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthUserService.findUser(req.body.email);
        if (!user) {
            // console.log('user not found');
            req.flash('error', { message: userNotFound });

            res.status(401).redirect('/v1/auth/login/');
            return res;
        }
        if (!error && user) {
            const reqPassword = req.body.password;
            const userPassword = user.password;
            const passwordsMatch = await bcrypt.compare(reqPassword, userPassword);
            if (!passwordsMatch) {
                req.flash('error', { message: wrongPassword });
                return res.redirect('/v1/auth/login/');
            }
            const token = await getJWTTokens(user.id);
            let data = {};
            data = {
                ...getUserMainFields(user),
                token,
            };
            req.session.user = data;
            return res.redirect('/v1/users/');
        }
        return res.status(200);
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.redirect('/v1/auth/login/');
        }

        if (error.name === 'MongoError') {
            console.log(req.flash('error', { message: defaultError }));
            return res.redirect('/v1/auth/login/');
        }

        return next(error);
    }
}

async function logout(req, res, next) {
    try {
        console.log('logout');
        await AuthUserService.logout(req.session.user['_id']);
        console.log(req.session.user['_id']);
        delete req.session.user;
        return res.status(200).redirect('/v1/auth/login');
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}

function anauthorized(req, res) {
    // console.log('UNAUTHORIZED');
    return res.render('401.ejs');
}

function forbidden(req, res) {
    // console.log('forbiden');
    return res.render('403.ejs');
}

function passport(req, res) {
    console.log('passport');
    return res.render('private.ejs');
}

module.exports = {
    register,
    createUser,
    loginPage,
    logout,
    login,
    getJWTTokens,
    forbidden,
    anauthorized,
    passport,
};
