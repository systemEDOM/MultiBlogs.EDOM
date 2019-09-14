const chai = require('chai');
const sinon = require('sinon');
const mock = require('mock-require');
let expect = chai.expect;

describe('Find User By ID', () => {

    before(() =>{
        mock('../../usescases/users/findUserUseCase.js', {
            handle: (id) => {
                return Promise.resolve({id: 1}).then((val) => val);
            }
        });
    });

    it('handle() should be return an Object with id', (done) => {
        const useCaseFindUser = require('../../usescases/users/findUserUseCase');
        let findUser = useCaseFindUser.handle(2);
        findUser.then( (result) => {
            expect(result).to.be.an("object").that.has.deep.property('id');
            done();
        }).catch( (error) => done(error));
    })
});