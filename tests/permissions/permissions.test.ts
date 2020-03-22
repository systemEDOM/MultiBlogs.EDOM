// import "reflect-metadata";
import "reflect-metadata";
import slugify from "slugify";
import container from "../../src/inversify.config";
import TYPES from "../../src/types";
import typeorm = require("typeorm");

import { UpdatePermissionUseCase } from "../../src/core/application/usecases/permissions/UpdatePermissionUseCase";
import { DeletePermissionUseCase } from "../../src/core/application/usecases/permissions/DeletePermissionUseCase";
import { CreatePermissionUseCase } from "../../src/core/application/usecases/permissions/CreatePermissionUseCase";
import { GetPermissionsUseCase } from "../../src/core/application/usecases/permissions/GetPermissionsUseCase";
import { Permission } from "../../src/infrastructure/entities/Permission";
import { FindByIdDomainUseCase } from "../../src/core/application/usecases/domains/FindByIdDomainUseCase";
import { Role } from "../../src/infrastructure/entities/Role";

describe("Tests for Permissions Module", () => {

    let createPermissionUseCase: CreatePermissionUseCase;
    let getPermissionsUseCase: GetPermissionsUseCase;
    let findByIdPermissionUseCase: FindByIdDomainUseCase;
    let updatePermissionUseCase: UpdatePermissionUseCase;
    let deletePermissionUseCase: DeletePermissionUseCase;

    const permissionData = new Permission(null);
    permissionData.name = "get permissions";

    const permissionResultData = new Permission(null);
    permissionResultData.id = 1;
    permissionResultData.name = "get permissions";
    permissionResultData.slug = slugify(permissionResultData.name);

    beforeEach(() => {
        typeorm.getRepository = jest.fn().mockReturnValue({
            find: jest.fn().mockReturnValue(new Array(1).fill(permissionResultData)),
            create: jest.fn().mockReturnValue(permissionResultData),
            save: jest.fn().mockReturnValue(permissionResultData),
            update: jest.fn().mockReturnValue(permissionResultData),
            findOneOrFail: jest.fn().mockReturnValue(permissionResultData),
            delete: jest.fn().mockReturnValue(permissionResultData),
        });
        createPermissionUseCase = container.get<CreatePermissionUseCase>(TYPES.CreatePermissionUseCase);
        getPermissionsUseCase = container.get<GetPermissionsUseCase>(TYPES.GetPermissionsUseCase);
        findByIdPermissionUseCase = container.get<FindByIdDomainUseCase>(TYPES.FindByIdPermissionUseCase);
        updatePermissionUseCase = container.get<UpdatePermissionUseCase>(TYPES.UpdatePermissionUseCase);
        deletePermissionUseCase = container.get<DeletePermissionUseCase>(TYPES.DeletePermissionUseCase);
    });

    it("execute() should be return an array of Permission instances", async () => {
        const result = await getPermissionsUseCase.execute();
        expect(result).toEqual(new Array(1).fill(permissionResultData));
    });

    it("execute(data) should be return an instance of Permission with properties correctly", async () => {
        const result = await createPermissionUseCase.execute(permissionData);
        expect(result).toEqual(permissionResultData);
    });

    it("execute(id) should be return an instance of Permission correctly by id", async () => {
        const result = await findByIdPermissionUseCase.execute(1);
        expect(result).toEqual(permissionResultData);
    });

    it("execute(id, data) should be return a Permission instance updated", async () => {
        const result = await updatePermissionUseCase.execute(1, permissionData);
        expect(result).toEqual(permissionResultData);
    });

    it("execute(id) should be return a Permission instance if it was deleted correctly", async () => {
        const result = await deletePermissionUseCase.execute(1);
        expect(result).toEqual(permissionResultData);
    });
});
