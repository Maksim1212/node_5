const request = require('supertest');
const chai = require('chai');
const cheerio = require('cheerio');
const jwt = require('jsonwebtoken');
const Token = require('csrf');
const UserService = require('../../src/components/User/service');
const AuthUserService = require('../../src/components/Auth/service');
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
    it('Login Action', (done) => {
        request(server)
            .post('/v1/auth/login')
            .type('form')
            .set('Cookie', '_csrf=test')
            .set({
                'xsrf-token': 'gaabrhn3--fmoXcOhmwoS6noe1TYvaDHzpYY',
            })
            .expect(302)
            .send(() => {
                AuthUserService.login(testUser.email, testUser.password);
                done();
            })
            .catch((err) => done(err));
    });
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


// it('Login Csrf', (done) => {
//     request(server)
//         .post('/v1/auth/login')
//         .set('Cookie', cookies)
//         .send({
//             email: testUser.email,
//             password: testUser.password,
//             _csrf: csrfToken,
//         })
//         .expect(200, done);
// .set('X-CSRF-TOKEN', csrfToken)
// .set('X-CSRF-TOKEN', csrfToken)
// .set('X-Requested-With', 'XMLHttpRequest')
// .set('Accept', 'application/json')
// .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
// .expect('Content-Type', /html/)
// .auth({ testUser })
// .send({ testUser })
// .send({ email: 'casio@gmail.com', password: '123456' })
//  .expect(302, done);
// });
// });
// describe('As Logged user', () => {
//     before(async() => {
//         // Log In as aser
//         agent = await chai.request.agent('http://localhost:3000');
//     });
//     it('should get csrfToken', async() => {
//         await agent.get('/auth/csrf')
//             .then((res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.be.a('object');
//                 expect(res.body).to.have.property('csrfToken');
//                 csrfToken = res.body.csrfToken;
//             })
//             .catch((err) => {
//                 throw err;
//             });
//     });
// });

// describe('UserComponent -> controller', () => {
//     // create access token
//     const testUser = { email: '_TestEmail@test.com', fullName: '_TestUser' };
//     const accessToken = jwt.sign({ name: testUser.fullName, email: testUser.email },
//         process.env.JWT_Secret_KEY);
//     let cookie;
//     let csrf;

//     // extra function for PUT/DELETE methods
//     function postData(req, payload, done) {
//         req.type('form')
//             .set('Cookie', cookie)
//             .send(payload)
//             .set('Accept', 'application/json')
//             .redirects(1)
//             .expect(200)
//             .expect('Content-Type', /html/)
//             .then((res) => {
//                 UserService.deleteById(payload.id);
//                 const isError = res.text.indexOf('id="error-box"') !== -1;
//                 // check error box contain
//                 expect(isError).to.equal(false);
//                 done();
//             })
//             .catch((err) => done(err));
//     }

//     // extra function for POST/PUT/DELETE methods with incorrect data
//     function postInvalidData(req, done) {
//         req.type('form')
//             .set('Cookie', cookie)
//             .send({
//                 _csrf: csrf,
//             })
//             .set('Accept', 'application/json')
//             .redirects(1)
//             .expect(200)
//             .expect('Content-Type', /html/)
//             .then((res) => {
//                 const isError = res.text.indexOf('id="error-box"') !== -1;
//                 // check error box contain
//                 expect(isError).to.equal(true);
//                 done();
//             })
//             .catch((err) => done(err));
//     }

//     // first request for get csrf
//     before((done) => {
//         request(server)
//             .get('/users')
//             .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
//             .then((res1) => {
//                 const regex = /name="_csrf" value="([^"]*)/g;
//                 csrf = regex.exec(res.text)[1];
//                 cookie = res1.headers['set-cookie'];
//                 cookie.push(`accessToken= ${accessToken} `);
//                 done();
//             });
//     });

//     /* Test route /users */
//     it('UserComponent -> controller -> GET /users ', (done) => {
//         request(server)
//             .get('/users')
//             .set('Accept', 'application/json')
//             .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
//             .expect('Content-Type', /html/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.text).to.include(`Login as: <span>${testUser.fullName}</span>`);
//                 done();
//             })
//             .catch((err) => done(err));
//     });

//     /* Test find user by id */
//     it('UserComponent -> controller -> GET /users/:id', async() => {
//         // create new user for test
//         const { id } = await UserService.create(testUser);
//         try {
//             const { body } = await request(server)
//                 .get(`/users/${id}`)
//                 .set('Accept', 'application/json')
//                 .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
//                 .expect('Content-Type', /json/)
//                 .expect(200);
//             expect(body);
//             expect(body).to.have.property('data').and.to.be.an('object');
//             expect(body.data).to.have.all.keys('_id', 'fullName', 'email');
//         } finally {
//             UserService.deleteById(id);
//         }
//     });

//     /* Test find user by id (wrong ID format) */
//     it('UserComponent -> controller -> GET /users/:id (wrong ID format)', (done) => {
//         request(server)
//             .get('/users/someWrongId')
//             .set('Accept', 'application/json')
//             .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
//             .expect('Content-Type', /json/)
//             .expect('set-cookie', /_csrf/)
//             .expect(422)
//             .then(({ body }) => {
//                 expect(body);
//                 expect(body).to.have.all.keys('error', 'details');
//                 done();
//             })
//             .catch((err) => done(err));
//     });

//     /* Test find user by id (wrong ID) */
//     it('UserComponent -> controller -> GET /users/:id (wrong ID)', (done) => {
//         request(server)
//             .get('/users/999999999999999559999999')
//             .set('Accept', 'application/json')
//             .set('Cookie', [`accessToken= ${accessToken} `]) // users protected route
//             .expect('Content-Type', /html/)
//             .expect(404)
//             .then((res) => {
//                 expect(res.text).to.include('User not found');
//                 done();
//             })
//             .catch((err) => done(err));
//     });

//     /* Test create user route */
//     it('UserComponent -> controller -> POST /users', (done) => {
//         request(server)
//             .post('/users')
//             .type('form')
//             .set('Cookie', cookie)
//             .send({
//                 email: testUser.email,
//                 fullName: testUser.fullName,
//                 _csrf: csrf,
//             })
//             .set('Accept', 'application/json')
//             .expect(302)
//             .then((res) => {
//                 UserService.deleteById(res.header.userid);
//                 done();
//             })
//             .catch((err) => done(err));
//     });

//     /* Test create user route (Invalid data) */
//     it('UserComponent -> controller -> POST /users (invalid data)', (done) => {
//         postInvalidData(request(server).post('/users'), done);
//     });

//     /* Test update user route */
//     it('UserComponent -> controller -> PUT /users', (done) => {
//         UserService.create(testUser)
//             .then(({ id }) => {
//                 const payload = {
//                     id,
//                     email: testUser.email,
//                     fullName: 'updated',
//                     _csrf: csrf,
//                 };
//                 postData(request(server).put('/users'), payload, done);
//             });
//     });

//     /* Test update user route (Invalid data) */
//     it('UserComponent -> controller -> PUT /users (Invalid data)', (done) => {
//         postInvalidData(request(server).put('/users'), done);
//     });

//     /* Test delete user route */
//     it('UserComponent -> controller -> DELETE /users', (done) => {
//         UserService.create(testUser)
//             .then(({ id }) => {
//                 const payload = {
//                     id,
//                     _csrf: csrf,
//                 };
//                 postData(request(server).delete('/users'), payload, done);
//             });
//     });

//     /* Test delete user route (Invalid data) */
//     it('UserComponent -> controller -> DELETE /users (Invalid data)', (done) => {
//         postInvalidData(request(server).delete('/users'), done);
//     });
