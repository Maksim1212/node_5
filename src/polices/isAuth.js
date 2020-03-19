const jwt = require('jsonwebtoken');
const AuthUserService = require('../components/Auth/service');
const { getJWTTokens } = require('../components/Auth/index');

async function isAuthJWT(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/v1/auth/401/');
    }
    let token = req.session.user.token.accessToken;
    const tokens = await getJWTTokens(req.session.user.id);
    console.log('token:');
    console.log(token);
    let decoded;
    console.log('id:');
    console.log(req.session.user['_id']);
    try {
        decoded = jwt.verify(token, process.env.JWT_Secret_KEY);
        console.log('decoded user:');
        console.log(decoded.user);
    } catch (error) {
        if (error.message === 'jwt expired') {
            const user = await AuthUserService.getUserByRefreshToken(req.session.user.token.refreshToken);
            req.session.user.token.accessToken = tokens.accessToken;
            token = req.session.user.token.accessToken;
            console.log('new:');
            console.log(token);
            decoded = jwt.verify(token, process.env.JWT_Secret_KEY);
            if (!user) {
                return res.redirect('/v1/auth/401/');
            }
        } else {
            return res.redirect('/v1/auth/403/');
        }
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp > currentTime) {
        return next();
    }
    return res.status(200);
}

module.exports = {
    isAuthJWT,
};
