const Validation = require('../validation');

class AuthUserValidation extends Validation {
    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @param {String} profile.password
     * @returns
     * @memberof AuthUserValidation
     */
    register(account) {
        return this.Joi
            .object({
                email: this.Joi.string().email(),
                password: this.Joi.string().password(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                _csrf: this.Joi.string(),
            })
            .validate(account);
    }

    /**
     * @param {String} data.email
     * @param {String} data.password
     * @returns
     * @memberof AuthUserValidation
     */

    login(data) {
        return this.Joi
            .object({
                email: this.Joi.string().email(),
                password: this.Joi.string().password(),
                _csrf: this.Joi.string(),
            })
            .validate(data);
    }
}
module.exports = new AuthUserValidation();