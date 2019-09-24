//import "reflect-metadata";
import 'reflect-metadata';
import container from '../../inversify.config';
import * as typeorm from 'typeorm';
import * as bcrypt from 'bcryptjs';
import TYPES from '../../types';
import slugify from 'slugify';
import { User } from '../../entity/User';
import { UserRepositoryInterface } from '../../repository/User/UserRepositoryInterface';
import { CreateUsersUseCaseInterface } from '../../usecases/users/contracts/CreateUsersUseCaseInterface';
import { GetUsersUseCaseInterface } from '../../usecases/users/contracts/GetUsersUseCaseInterface';
import { FindByIdUsersUseCaseInterface } from '../../usecases/users/contracts/FindByIdUsersUseCaseInterface';
import { UpdateUsersUseCaseInterface } from '../../usecases/users/contracts/UpdateUsersUseCaseInterface';
import { DeleteUsersUseCaseInterface } from '../../usecases/users/contracts/DeleteUsersUseCaseInterface';
import { FindByUsernameUsersUseCaseInterface } from '../../usecases/users/contracts/FindByUsernameUsersUseCaseInterface';

describe('Unit Tests for UsersUseCases', () => {
    let userRepository: UserRepositoryInterface;
    let createUsersUseCase: CreateUsersUseCaseInterface;
    let getUsersUseCase: GetUsersUseCaseInterface;
    let findByIdUserUSeCase: FindByIdUsersUseCaseInterface;
    let finByUsernameUserUseCase: FindByUsernameUsersUseCaseInterface;
    let updateUseUseCase: UpdateUsersUseCaseInterface;
    let deleteUserUseCase: DeleteUsersUseCaseInterface;

    let userData = new User();
    userData.name = "Daniel Oseguera";
    userData.email = "prueba@prueba.com";
    userData.username = slugify("prueba user");
    
    let userResultData = new User();
    userResultData.id = 1;
    userResultData.name = "Daniel Oseguera";
    userResultData.email = "prueba@prueba.com";
    userResultData.username = slugify("prueba user");

    let password = "prueba";
    let passwordTest = "prueba";

    beforeEach(async () => {
        (typeorm as any).getRepository = jest.fn();
        (typeorm as any).getRepository.mockReturnValue({
            find: () => [].push(userResultData),
            create: (data) => userData,
            save: (data) => {
                userData.id = 1;
                return userData;
            },
            update: (data) => Object.create({raw: {changedRows: 1}}),
            findOneOrFail: (id) => userResultData,
            delete: (id) => Object.create({raw: {changedRows: 1}}),
        });
        userRepository = container.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface);        
        createUsersUseCase = container.get<CreateUsersUseCaseInterface>(TYPES.CreateUsersUseCaseInterface);
        getUsersUseCase = container.get<GetUsersUseCaseInterface>(TYPES.GetUsersUseCaseInterface);
        findByIdUserUSeCase = container.get<FindByIdUsersUseCaseInterface>(TYPES.FindByIdUsersUseCaseInterface);
        finByUsernameUserUseCase = container.get<FindByUsernameUsersUseCaseInterface>(TYPES.FindByUsernameUsersUseCaseInterface);
        updateUseUseCase = container.get<UpdateUsersUseCaseInterface>(TYPES.UpdateUsersUseCaseInterface);
        deleteUserUseCase = container.get<DeleteUsersUseCaseInterface>(TYPES.DeleteUsersUseCaseInterface);
    });

    it('handle() should be return an array of objects instances of User', () => {
        let result = getUsersUseCase.handle();
        expect([].push(userData)).toEqual(result);
    });

    it('handle(data) should be return an instance of User correctly', async () => {
        setPasswordHash();
        let result = await createUsersUseCase.handle(userData);
        expect(await bcrypt.compare(passwordTest, result.password)).toBeTruthy();
        delete result.password;
        delete userResultData.password;
        expect(userResultData).toEqual(result);
    });

    it('handle(id) should be return an instance of User correctly By Id', () => {
        let id = 1;
        let result = findByIdUserUSeCase.handle(id);
        expect(id).toEqual(result.id);
    });

    it('handle(username) should be return an instance of User correctly By Username', () => {
        let username = "prueba-user";
        let result = finByUsernameUserUseCase.handle(username);
        expect(username).toEqual(result.username);
    });

    it('handle(id, data) should be return a number of changedRows >= 1 updated', async () => {
        setPasswordHash();
        let id = 1;
        let result = await updateUseUseCase.handle(id, userData);
        expect(1).toEqual(result.raw.changedRows);
    });

    it('handle(id) should be return a number of changedRows >= 1 deleted', () => {
        let id = 1;
        let result = deleteUserUseCase.handle(id);
        expect(1).toEqual(result.raw.changedRows);
    });

    async function setPasswordHash () {
        userData.password = password;
        userResultData.password = await bcrypt.hash(password, 10);
    };
});