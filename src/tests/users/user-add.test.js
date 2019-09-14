const slug = require('slug');
const sinon = require('sinon');
const assert = require('assert');


//imports of dependencies
const addUserUseCase = require('../../usescases/users/addUserUseCase');
const UserRepository = require('../../repositories/UserRepository');

let data ={
    name: "Daniel Oseguera",
    email: "prueba@prueba.com",
    username: slug("prueba jaja"),
};

let resultData ={
    name: "Daniel Oseguera",
    email: "prueba@prueba.com",
    username: slug("prueba jaja"),
};

let UserRepo;

describe('save user prueba', () => {

    before(() => {
        UserRepo = new UserRepository()
        sinon.stub(UserRepo, 'create').withArgs(data).returns(resultData);
    });

    after(() => {
        UserRepo.create.restore();
    });

    it('handle() should be return an object', () => {
        let AddUserUseCase = new addUserUseCase(UserRepo);
        let result = AddUserUseCase.handle(data);

        sinon.assert.calledOnce(UserRepo.create);
        assert.deepEqual(data, result);
    });
});