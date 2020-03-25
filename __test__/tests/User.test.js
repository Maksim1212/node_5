const request = require('supertest');
const chai = require('chai');
const jwt = require('jsonwebtoken');

const server = require('../../src/server/server');

const testUser = {
    email: 'testUserEmail@gmail.com',
    fullName: 'Test User',
};

const { expect } = chai;
const user = '5e73896da18a9036427ca21d';
const accessToken = jwt.sign({ user }, process.env.JWT_Secret_KEY, { expiresIn: 5 });

describe('UserComponent -> controller', () => {
    describe('UserComponent -> controller -> /v1/createUser', () => {
        it('ADD NEW USER', (done) => {
            request(server)
                .post('/v1/users/')
                // .set('Accept', 'text/html')
                //.set('Accept', 'application/json')
                .set('Cookie', [`accessToken= ${accessToken} `])
                .send({ testUser })
                .redirects(1)
                .expect('Content-Type', /html/)
                .expect(200)
                .then(({ res }) => {
                    expect(res.text).to.include(`<td>${testUser.fullName}</td>`);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});

// describe('UserComponent -> controller', () => {
//     describe('UserComponent -> controller -> /v1/createUser', () => {
//         it('ADD NEW USER', (done) => {
//             request(server)
//                 .post('/v1/users/')
//                 // .set('Accept', 'text/html')
//                 .set('Accept', 'application/json')
//                 .send({ testUser })
//                 .redirects(1)
//                 .expect('Content-Type', /html/)
//                 .expect(200)
//                 // .then(({ body }) => {
//                 //     const expectBody = expect(body);
//                 //     expectBody.to.have.property('data');
//                 //     done();
//                 // })
//                 .then(({ res }) => {
//                     expect(res.text).to.include(`<td>${testUser.fullName}</td>`);
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });
// });
