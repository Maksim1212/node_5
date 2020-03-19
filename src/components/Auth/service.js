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
function findUser(email) {
    return AuthUserModel.findOne({ email }).exec();
}

function login(email, password) {
    return AuthUserModel.login(email, password);
}

function logout(_id, refreshToken) {
    return AuthUserModel.updateOne({ _id }, { refreshToken }).exec();
}

function createUser(profile) {
    return AuthUserModel.create(profile);
}


function getAccesToken(_id, accesToken) {
    return AuthUserModel.updateOne({ _id }, { accesToken }).exec();
}

function updateRefreshToken(_id, refreshToken) {
    return AuthUserModel.updateOne({ _id }, { refreshToken }).exec();
}

function getUserByRefreshToken(refreshToken) {
    return AuthUserModel.findOne({ refreshToken }).exec();
}
module.exports = {
    register,
    createUser,
    findUser,
    getAccesToken,
    login,
    logout,
    updateRefreshToken,
    getUserByRefreshToken,
};
