const request = require('supertest');
const chai = require('chai');
const cheerio = require('cheerio');
const jwt = require('jsonwebtoken');
const Token = require('csrf');
const UserService = require('../../src/components/User/service');
const server = require('../../src/server/server');

const { expect } = chai;
// const fq = wrappedContent.find('Form Input[id="client_edit_id"]').prop('value')

let testUser = {};
testUser = {
    email: 'casio@gmail.com',
    password: '123456',
};
let csrfToken;
let cookies;
// const csrfToken = 'nKmpl015W2aLGefYBL9pEDj-';


// const token = new token();
// const csrfToken = token.create('test');
// console.log(csrfToken); // gaabrhn3--fmoXcOhmwoS6noe1TYvaDHzpYY

// let csrf = $html.find('input[name=_csrf]').val();
// console.log(csrf);

// function extractCsrfToken(res) {
//     const $ = cheerio.load(res.text);
//     return $('[name=_csrf]').val();
// }

describe('AuthUserComponent -> controller', () => {
    it('Login page', (done) => {
        request(server)
            .get('/v1/auth/login')
            .expect(200, done);
        // .expect(/Sign In/, done);
    });
    it('Register page', (done) => {
        request(server)
            .get('/v1/auth/register')
            .expect(200, done);
    });
    it('Page 401', (done) => {
        request(server)
            .get('/v1/auth/401')
            .expect(200, done);
    });
    it('Page 403', (done) => {
        request(server)
            .get('/v1/auth/403')
            .expect(200, done);
    });
    // it('Login Action', (done) => {
    //     request(server)
    //         .post('/v1/auth/login')
    //         .type('form')
    //         .set('Cookie', '_csrf=test')
    //         .set({
    //             testUser,
    //         })
    //         .expect(302, done);
    // });
    // it('Register Action', (done) => {
    //     request(server)
    //         .post('/v1/auth/createUser')
    //         // .type('form')
    //         // .set('Cookie', '_csrf=test')
    //         .set({
    //             testUser,
    //         })
    //         .expect(302, done);
    // });
});

// describe('POST /', () => {

//     const getLoginCsrfs = async() => {
//         const res = await request(server)
//             .get('/v1/auth/login');
//         const $ = cheerio.load(res.text);
//         csrfToken = $('[name=_csrf]').val();
//         cookies = res.headers['set-cookie'];
//         return res;
//     };
//     const postLogin = async() => {
//         return request(server)
//             .post('/v1/auth/login')
//             .type('form')
//             .set('Cookie', cookies)
//             .send({
//                 // email: testUser.email,
//                 //password: testUser.password,
//                 _csrf: csrfToken,
//             })
//             .expect(302);
//     };
//     // it('should return 401 without incorrect user info', async() => {
//     //     await getLoginCsrfs();
//     //     testUser.password = 'wrongpassword';
//     //     const res = await postLogin();
//     //     expect(res.status).toBe(401);
//     // });

//     // it('should return 403 without csrf token/header credentials', async() => {
//     //     await getLoginCsrfs();
//     //     csrfToken = '';
//     //     cookies = '';
//     //     testUser.password = 'password';
//     //     const res = await postLogin();
//     //     expect(res.status).toBe(403);
//     // });

//     it('should return 200 with correct credentials', async() => {
//         await getLoginCsrfs();
//         // testUser.password = 'password';
//         const res = await postLogin();
//     });
