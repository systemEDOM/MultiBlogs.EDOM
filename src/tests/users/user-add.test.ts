import sinon from 'sinon';
import {assert} from 'chai';
import slugify from 'slugify';
import { UserRepositoryInterface } from '../../repository/User/UserRepositoryInterface';


let data ={
    name: "Daniel Oseguera",
    email: "prueba@prueba.com",
    username: slugify("prueba jaja"),
};

let resultData ={
    name: "Daniel Oseguera",
    email: "prueba@prueba.com",
    username: slugify("prueba jaja"),
};


describe('save user prueba', () => {

    before(() => {
        userRepository: UserRepositoryInterface
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