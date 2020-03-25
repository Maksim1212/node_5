const chai = require('chai');
const UtilService = require('../../src/components/Auth/service');

const { expect } = chai;

const newUser = {
    email: 'chaiTestUser@gmail.com',
    password: '123456',
};
let newUserEmail = '';

describe('AuthUserComponent -> service', () => {
    it('AuthUserComponent -> service -> create', (done) => {
        UtilService.createUser(newUser)
            .then((res) => {
                newUserEmail = res.email;
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    it('AuthUserComponent -> service -> findUser', (done) => {
        UtilService.findUser(newUserEmail)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    // it('AuthUserComponent -> service -> updateById', (done) => {
    //     UtilService.updateById(newUserId, { fullName })
    //         .then((res) => {
    //             const expectBody = expect(res);
    //             expectBody.to.be.an('object').and.to.have.keys('n', 'nModified', 'ok');
    //             done();
    //         })
    //         .catch(done);
    // });
    // it('AuthUserComponent -> service -> deleteById', (done) => {
    //     UtilService.deleteById(newUserId)
    //         .then((res) => {
    //             const expectBody = expect(res);
    //             expectBody.to.be.an('object').and.to.have.keys('n', 'ok', 'deletedCount');
    //             done();
    //         })
    //         .catch(done);
    // });
});
