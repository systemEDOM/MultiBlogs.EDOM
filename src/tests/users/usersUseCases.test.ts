import "reflect-metadata";

import * as bcrypt from "bcryptjs";
import slugify from "slugify";
import * as typeorm from "typeorm";
import { User } from "../../entity/User";
import container from "../../inversify.config";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import TYPES from "../../types";
import { CreateUsersUseCaseInterface } from "../../usecases/users/contracts/CreateUsersUseCaseInterface";
import { DeleteUsersUseCaseInterface } from "../../usecases/users/contracts/DeleteUsersUseCaseInterface";
import { FindByIdUsersUseCaseInterface } from "../../usecases/users/contracts/FindByIdUsersUseCaseInterface";
import { FindByUsernameUsersUseCaseInterface } from "../../usecases/users/contracts/FindByUsernameUsersUseCaseInterface";
import { GetUsersUseCaseInterface } from "../../usecases/users/contracts/GetUsersUseCaseInterface";
import { UpdateUsersUseCaseInterface } from "../../usecases/users/contracts/UpdateUsersUseCaseInterface";

describe("Unit Tests for UsersUseCases", () => {
    let userRepository: UserRepositoryInterface;
    let createUsersUseCase: CreateUsersUseCaseInterface;
    let getUsersUseCase: GetUsersUseCaseInterface;
    let findByIdUserUSeCase: FindByIdUsersUseCaseInterface;
    let finByUsernameUserUseCase: FindByUsernameUsersUseCaseInterface;
    let updateUseUseCase: UpdateUsersUseCaseInterface;
    let deleteUserUseCase: DeleteUsersUseCaseInterface;

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
        userRepository = container.get<UserRepositoryInterface>(TYPES.UserRepositoryInterface);
        createUsersUseCase = container.get<CreateUsersUseCaseInterface>(TYPES.CreateUsersUseCaseInterface);
        getUsersUseCase = container.get<GetUsersUseCaseInterface>(TYPES.GetUsersUseCaseInterface);
        findByIdUserUSeCase = container.get<FindByIdUsersUseCaseInterface>(TYPES.FindByIdUsersUseCaseInterface);
        // tslint:disable-next-line:max-line-length
        finByUsernameUserUseCase = container.get<FindByUsernameUsersUseCaseInterface>(TYPES.FindByUsernameUsersUseCaseInterface);
        updateUseUseCase = container.get<UpdateUsersUseCaseInterface>(TYPES.UpdateUsersUseCaseInterface);
        deleteUserUseCase = container.get<DeleteUsersUseCaseInterface>(TYPES.DeleteUsersUseCaseInterface);
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
