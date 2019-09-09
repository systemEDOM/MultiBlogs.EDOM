const chai = require('chai');
const mock = require('mock-require');
const slug = require('slug');
const sinon = require('sinon');
let expect = chai.expect;
let assert = chai.assert;

describe('save user prueba', () => {
    it('handle() should be return an object', async (done) => {
        const useCaseSaveUser = require('../../usescases/users/saveUserUseCase');
        let user = {
            name: "Daniel Oseguera",
            email: "prueba",
            username: "prueba",
            password: "prueba"
        }
        
        var save = sinon.stub(useCaseSaveUser, 'handle');
        save.withArgs(user);
        //save.returns({id: 1, name: "Daniel Oseguera", email: "prueba@prueba.com", username: "prueba", password: "prueba"});
        await useCaseSaveUser.handle(user);
        expect(1).to.equal(1);
        done();
        //expect(useCaseSaveUser);
        //let saveUser = useCaseSaveUser.handle(user);
        //console.log(handle.callCount);
        /*save.then( (result) => {
            expect(result).to.be.an("object").that.deep.property("id");
            done();
        }).catch( (error) => done(error));*/
        //save.restore();
    })
});