const chai = require('chai');
const UtilService = require('../../src/components/User/service');

const { expect } = chai;

const user = {
    id: '5e5803e5b8f67715e823b1e4',
    email: 'test@ukr.net',
    fullName: 'Net Ukr',
};
const fullName = 'New Name';
const newUser = {
    email: 'chaiTestUser@gmail.com',
    fullName: 'Chai Test',
    // id: '5e79dc1c12fecb442a87e49b',
};

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> findAll', (done) => {
        UtilService.findAll()
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('array');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> findById', (done) => {
        UtilService.findById(user.id)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> create', (done) => {
        UtilService.create(newUser)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                const userDel = expect(res);
                console.log(userDel);
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> updateById', (done) => {
        UtilService.updateById(newUser.id, { fullName })
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.have.keys('n', 'nModified', 'ok');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> deleteById', (done) => {
        UtilService.deleteById(newUser.id)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.have.keys('n', 'ok', 'deletedCount');
                done();
            })
            .catch(done);
    });
});
