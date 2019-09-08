const chai = require('chai');
const sinon = require('sinon');
const mock = require('mock-require');
const slug = require('slug');
let expect = chai.expect;

describe('Find User By Username', () => {

    before(() =>{
        mock('../../usescases/users/saveUserUseCase.js', {
            handle: (data) => {
                let dataReturn = {
                    id: 1,
                    name: "Daniel Oseguera",
                    email: "prueba",
                    username: "prueba",
                    password: "password",
                }
                return Promise.resolve(dataReturn).then((val) => val);
            }
        });
    });

    it('handle() should be return an object', (done) => {
        const useCaseSaveUser = require('../../usescases/users/saveUserUseCase');
        let user = {
            name: "Daniel Oseguera",
            email: "prueba",
            username: "prueba",
            password: "password", 
        }
        let saveUser = useCaseSaveUser.handle(user);
        saveUser.then( (result) => {
            expect(result).to.be.an("object").that.deep.property("id");
            done();
        }).catch( (error) => done(error));
    })
});