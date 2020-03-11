const AuthUserService = require('../Auth/service');
const AuthUserValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';

async function register(req, res, next) {
    try {} catch (error) {
        return next(error);
    }
}

async function login(req, res, next) {
    try {} catch (error) {
        return next(error);
    }
}
