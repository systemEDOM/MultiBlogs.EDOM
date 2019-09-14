const chai = require('chai');
const sinon = require('sinon');
const mock = require('mock-require');
let expect = chai.expect;

describe('Delete User', () => {

    before(() =>{
        mock('../../usescases/users/deleteUserUseCase.js', {
            handle: (id) => {
                return Promise.resolve(id).then((val) => 1);
            }
        });
    });

    it('handle() should be return an Integer', (done) => {
        const useCaseDeleteUser = require('../../usescases/users/deleteUserUseCase');
        let deleteUser = useCaseDeleteUser.handle(7);
        deleteUser.then( (result) => {
            expect(result).to.be.eq(1);
            done();
        }).catch( (error) => done(error));
    })
});