// import "reflect-metadata";
import "reflect-metadata";
import slugify from "slugify";
import * as typeorm from "typeorm";
import { Domain } from "../../src/core/domain/entity/Domain";
import container from "../../src/inversify.config";
import { DomainRepository } from "../../src/core/domain/interfaces/DomainRepository";
import TYPES from "../../src/types";
import { CreateDomainUseCase } from "../../src/core/application/usecases/domains/CreateDomainUseCase";
import { DeleteDomainUseCase } from "../../src/core/application/usecases/domains/DeleteDomainUseCase";
import { FindByIdDomainUseCase } from "../../src/core/application/usecases/domains/FindByIdDomainUseCase";
import { GetDomainsUseCase } from "../../src/core/application/usecases/domains/GetDomainsUseCase";
import { UpdateDomainsUseCase } from "../../src/core/application/usecases/domains/UpdateDomainsUseCase";

describe("Unit Tests for DomainsUseCases", () => {
    let domainRepository: DomainRepository;
    let createDomainsUseCase: CreateDomainUseCase;
    let getDomainsUseCase: GetDomainsUseCase;
    let findByIdDomainUSeCase: FindByIdDomainUseCase;
    let updateUseUseCase: UpdateDomainsUseCase;
    let deleteDomainUseCase: DeleteDomainUseCase;

    const domainData = new Domain();
    domainData.name = slugify("prueba domain");
    domainData.url = "http://google.com.mx";
    const domainResultData = new Domain();
    domainResultData.id = 1;
    domainResultData.name = slugify("prueba domain");
    domainResultData.url = "http://google.com.mx";

    beforeEach(() => {
        (typeorm as any).getRepository = jest.fn();
        (typeorm as any).getRepository.mockReturnValue({
            find: () => [].push(domainResultData),
            create: (data) => domainData,
            save: (data) => {
                domainData.id = 1;
                return domainData;
            },
            update: (data) => Object.create({raw: {changedRows: 1}}),
            findOneOrFail: (id) => domainResultData,
            delete: (id) => Object.create({raw: {changedRows: 1}}),
        });
        domainRepository = container.get<DomainRepository>(TYPES.DomainRepositoryInterface);
        createDomainsUseCase = container.get<CreateDomainUseCase>(TYPES.CreateDomainsUseCaseInterface);
        getDomainsUseCase = container.get<GetDomainsUseCase>(TYPES.GetDomainsUseCaseInterface);
        findByIdDomainUSeCase = container.get<FindByIdDomainUseCase>(TYPES.FindByIdDomainsUseCaseInterface);
        updateUseUseCase = container.get<UpdateDomainsUseCase>(TYPES.UpdateDomainsUseCaseInterface);
        deleteDomainUseCase = container.get<DeleteDomainUseCase>(TYPES.DeleteDomainsUseCaseInterface);
    });

    it("handle() should be return an array of objects instances of Domain", () => {
        const result = getDomainsUseCase.handle();
        expect([].push(domainData)).toEqual(result);
    });

    it("handle(data) should be return an instance of Domain correctly", () => {
        const result = createDomainsUseCase.handle(domainData);
        expect(domainResultData).toEqual(result);
    });

    it("handle(id) should be return an instance of Domain correctly By Id", () => {
        const id = 1;
        const result = findByIdDomainUSeCase.handle(id);
        expect(id).toEqual(result.id);
    });

    it("handle(id, data) should be return a number of changedRows >= 1", () => {
        const id = 1;
        const result = updateUseUseCase.handle(id, domainData);
        expect(1).toEqual(result.raw.changedRows);
    });

    it("handle(id) should be return a number of changedRows >= 1", () => {
        const id = 1;
        const result = deleteDomainUseCase.handle(id);
        expect(1).toEqual(result.raw.changedRows);
    });
});
