//import "reflect-metadata";
import container from '../../inversify.config';
import * as sinon from 'sinon';
import * as typeorm from 'typeorm';
import TYPES from '../../types';
import slugify from 'slugify';
import {assert} from 'chai';
import { UserRepositoryInterface } from '../../repository/User/UserRepositoryInterface';
import { CreateUsersUseCaseInterface } from '../../usescases/users/contracts/CreateUsersUseCaseInterface';
import { User } from '../../entity/User';

let userData = new User();
userData.name = "Daniel Oseguera";
userData.email = "prueba@prueba.com";
userData.username = slugify("prueba user"); 

let userResultData = new User();
userResultData.name = "Daniel Oseguera";
userResultData.email = "prueba@prueba.com";
userResultData.username = slugify("prueba user");


describe('Test for CreateUsersUseCase', () => {
    let userRepository: UserRepositoryInterface;
    let userRepositoryStub;
    let createUsersUseCase: CreateUsersUseCaseInterface;

    before(() => {
        sinon.stub(typeorm, 'getRepository').withArgs(User);
        userRepository = container.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface);
        userRepositoryStub = sinon.stub(userRepository, 'create').withArgs(userData).returns(userResultData);
        createUsersUseCase = container.get<CreateUsersUseCaseInterface>(TYPES.CreateUsersUseCaseInterface);
    });

    after(() => {
        sinon.restore();
        Buffer.alloc(userRepositoryStub);
    });

    it('handle() should be return an instance of User correctly', () => {
        let result = createUsersUseCase.handle(userData);
        sinon.assert.calledOnce(userRepository.create);
        assert.deepEqual(userData, result);
    });
});