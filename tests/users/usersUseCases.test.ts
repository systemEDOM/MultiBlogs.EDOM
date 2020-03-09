import "reflect-metadata";

import * as bcrypt from "bcryptjs";
import slugify from "slugify";
import * as typeorm from "typeorm";
import { User } from "../../src/core/domain/entity/User";
import container from "../../src/inversify.config";
import { UserRepository } from "../../src/core/domain/interfaces/UserRepository";
import TYPES from "../../src/types";
import { CreateUserUseCase } from "../../src/core/application/usecases/users/CreateUserUseCase";
import { DeleteUserUseCase } from "../../src/core/application/usecases/users/DeleteUserUseCase";
import { FindByIdUserUseCase } from "../../src/core/application/usecases/users/FindByIdUserUseCase";
import { FindByUsernameUserUseCase } from "../../src/core/application/usecases/users/FindByUsernameUserUseCase";
import { GetUsersUseCase } from "../../src/core/application/usecases/users/GetUsersUseCase";
import { UpdateUserUseCase } from "../../src/core/application/usecases/users/UpdateUserUseCase";

describe("Unit Tests for UsersUseCases", () => {
    let userRepository: UserRepository;
    let createUsersUseCase: CreateUserUseCase;
    let getUsersUseCase: GetUsersUseCase;
    let findByIdUserUSeCase: FindByIdUserUseCase;
    let finByUsernameUserUseCase: FindByUsernameUserUseCase;
    let updateUseUseCase: UpdateUserUseCase;
    let deleteUserUseCase: DeleteUserUseCase;

    const userData = new User();
    userData.name = "Daniel Oseguera";
    userData.email = "prueba@prueba.com";
    userData.username = slugify("prueba user");

    const userResultData = new User();
    userResultData.id = 1;
    userResultData.name = "Daniel Oseguera";
    userResultData.email = "prueba@prueba.com";
    userResultData.username = slugify("prueba user");

    const password = "prueba";
    const passwordTest = "prueba";

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
        userRepository = container.get<UserRepository>(TYPES.UserRepositoryInterface);
        createUsersUseCase = container.get<CreateUserUseCase>(TYPES.CreateUsersUseCaseInterface);
        getUsersUseCase = container.get<GetUsersUseCase>(TYPES.GetUsersUseCaseInterface);
        findByIdUserUSeCase = container.get<FindByIdUserUseCase>(TYPES.FindByIdUsersUseCaseInterface);
        // tslint:disable-next-line:max-line-length
        finByUsernameUserUseCase = container.get<FindByUsernameUserUseCase>(TYPES.FindByUsernameUsersUseCaseInterface);
        updateUseUseCase = container.get<UpdateUserUseCase>(TYPES.UpdateUsersUseCaseInterface);
        deleteUserUseCase = container.get<DeleteUserUseCase>(TYPES.DeleteUsersUseCaseInterface);
    });

    it("handle() should be return an array of objects instances of User", () => {
        const result = getUsersUseCase.handle();
        expect([].push(userData)).toEqual(result);
    });

    it("handle(data) should be return an instance of User correctly", async () => {
        setPasswordHash();
        const result = await createUsersUseCase.handle(userData);
        expect(await bcrypt.compare(passwordTest, result.password)).toBeTruthy();
        delete result.password;
        delete userResultData.password;
        expect(userResultData).toEqual(result);
    });

    it("handle(id) should be return an instance of User correctly By Id", () => {
        const id = 1;
        const result = findByIdUserUSeCase.handle(id);
        expect(id).toEqual(result.id);
    });

    it("handle(username) should be return an instance of User correctly By Username", () => {
        const username = "prueba-user";
        const result = finByUsernameUserUseCase.handle(username);
        expect(username).toEqual(result.username);
    });

    it("handle(id, data) should be return a number of changedRows >= 1 updated", async () => {
        setPasswordHash();
        const id = 1;
        const result = await updateUseUseCase.handle(id, userData);
        expect(1).toEqual(result.raw.changedRows);
    });

    it("handle(id) should be return a number of changedRows >= 1 deleted", () => {
        const id = 1;
        const result = deleteUserUseCase.handle(id);
        expect(1).toEqual(result.raw.changedRows);
    });

    async function setPasswordHash() {
        userData.password = password;
        userResultData.password = await bcrypt.hash(password, 10);
    }
});
