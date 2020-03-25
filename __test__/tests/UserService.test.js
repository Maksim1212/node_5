const chai = require('chai');
const UtilService = require('../../src/components/User/service');

const { expect } = chai;

const fullName = 'New Name';
const newUser = {
    email: 'chaiTestUser@gmail.com',
    fullName: 'Chai Test',
};
let newUserId = '';

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> create', (done) => {
        UtilService.create(newUser)
            .then((res) => {
                newUserId = res['_id'];
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
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
        UtilService.findById(newUserId)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> updateById', (done) => {
        UtilService.updateById(newUserId, { fullName })
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.have.keys('n', 'nModified', 'ok');
                done();
            })
            .catch(done);
    });
    it('UserComponent -> service -> deleteById', (done) => {
        UtilService.deleteById(newUserId)
            .then((res) => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.have.keys('n', 'ok', 'deletedCount');
                done();
            })
            .catch(done);
    });
});
