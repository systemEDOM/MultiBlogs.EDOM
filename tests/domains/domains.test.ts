// import "reflect-metadata";
import "reflect-metadata";
import slugify from "slugify";
import container from "../../src/inversify.config";
import TYPES from "../../src/types";
import { CreateDomainUseCase } from "../../src/core/application/usecases/domains/CreateDomainUseCase";
import { GetDomainsUseCase } from "../../src/core/application/usecases/domains/GetDomainsUseCase";
import { FindByIdDomainUseCase } from "../../src/core/application/usecases/domains/FindByIdDomainUseCase";
import { UpdateDomainUseCase } from "../../src/core/application/usecases/domains/UpdateDomainUseCase";
import { DeleteDomainUseCase } from "../../src/core/application/usecases/domains/DeleteDomainUseCase";
import { Domain } from "../../src/infrastructure/entities/Domain";
import typeorm = require("typeorm");

describe("Tests for Domains Module", () => {
    let createDomainUseCase: CreateDomainUseCase;
    let getDomainsUseCase: GetDomainsUseCase;
    let findByIdDomainUSeCase: FindByIdDomainUseCase;
    let updateDomainUseUseCase: UpdateDomainUseCase;
    let deleteDomainUseCase: DeleteDomainUseCase;

    const domainData = new Domain(null);
    domainData.name = "prueba domain";
    domainData.url = "http://google.com.mx";

    const domainResultData = new Domain(null);
    domainResultData.id = 1;
    domainResultData.name = "prueba domain";
    domainResultData.slug = slugify(domainResultData.name);
    domainResultData.url = "http://google.com.mx";

    beforeEach(() => {
        typeorm.getRepository = jest.fn().mockReturnValue({
            find: jest.fn().mockResolvedValue(new Array(1).fill(domainResultData)),
            create: jest.fn().mockResolvedValue(domainResultData),
            save: jest.fn().mockResolvedValue(domainResultData),
            update: jest.fn().mockResolvedValue(domainResultData),
            findOneOrFail: jest.fn().mockResolvedValue(domainResultData),
            delete: jest.fn().mockResolvedValue(domainResultData),
        });
        createDomainUseCase = container.get<CreateDomainUseCase>(TYPES.CreateDomainUseCase);
        getDomainsUseCase = container.get<GetDomainsUseCase>(TYPES.GetDomainsUseCase);
        findByIdDomainUSeCase = container.get<FindByIdDomainUseCase>(TYPES.FindByIdDomainUseCase);
        updateDomainUseUseCase = container.get<UpdateDomainUseCase>(TYPES.UpdateDomainUseCase);
        deleteDomainUseCase = container.get<DeleteDomainUseCase>(TYPES.DeleteDomainUseCase);
    });

    it("execute() should be return an array of Domain instances", async () => {
        const result = await getDomainsUseCase.execute();
        expect(result).toEqual(new Array(1).fill(domainResultData));
    });

    it("execute(data) should be return an instance of Domain with properties correctly", async () => {
        const result = await createDomainUseCase.execute(domainData);
        expect(result).toEqual(domainResultData);
    });

    it("execute(id) should be return an instance of Domain correctly by id", async () => {
        const result = await findByIdDomainUSeCase.execute(1);
        expect(result).toEqual(domainResultData);
    });

    it("execute(id, data) should be return a Domain instance updated", async () => {
        const result = await updateDomainUseUseCase.execute(1, domainData);
        expect(result).toEqual(domainResultData);
    });

    it("execute(id) should be return a Domain instance if it was deleted correctly", async () => {
        const result = await deleteDomainUseCase.execute(1);
        expect(result).toEqual(domainResultData);
    });
});
