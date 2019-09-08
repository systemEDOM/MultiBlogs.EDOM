const chai = require('chai');
const sinon = require('sinon');
const mock = require('mock-require');
const slug = require('slug');
let expect = chai.expect;

describe('Find User By Username', () => {

    before(() =>{
        mock('../../usescases/users/findUserByUsernameUseCase.js', {
            handle: (id) => {
                return Promise.resolve({id: 1}).then((val) => val);
            }
        });
    });

    it('handle() should be return an Integer', (done) => {
        const useCaseFindByUsernameUser = require('../../usescases/users/findUserByUsernameUseCase');
        let findByUsername = useCaseFindByUsernameUser.handle(slug("usuario prueba"));
        findByUsername.then( (result) => {
            expect(result).to.be.an("object").that.has.deep.property('id');
            done();
        }).catch( (error) => done(error));
    })
});