const chai = require('chai');
const sinon = require('sinon');
const mock = require('mock-require');
let expect = chai.expect;

describe('Get Users', () => {

    before(() =>{
        mock('../../usescases/users/getUsersUseCase.js', {
            handle: () => {
                return Promise.resolve('Find All').then((val) => {
                    return ["solve", "solve2"];
                });
            }
        });
    });

    it('handle() should be return an Array within Promise resolve', (done) => {
        const useCaseGetUsers = require('../../usescases/users/getUsersUseCase');
        
        let getUsers = useCaseGetUsers.handle();
        getUsers.then( (result) => {
            expect(result).to.be.an('array');
            done();
        }).catch( (error) => done(error));
    })
});