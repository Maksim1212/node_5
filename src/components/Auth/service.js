const AuthUserModel = require('../Auth/model');

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function register(profile) {
    return AuthUserModel.register(profile);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} email
 * @param {object} password
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function login(email, password) {
    return AuthUserModel.login(email, password);
}

function createUser(profile) {
    return AuthUserModel.create(profile);
}

module.exports = {
    register,
    login,
    createUser,
};