// import "reflect-metadata";
import "reflect-metadata";
import slugify from "slugify";
import * as typeorm from "typeorm";
import { Domain } from "../../entity/Domain";
import container from "../../inversify.config";
import { DomainRepositoryInterface } from "../../repository/Domain/DomainRepositoryInterface";
import TYPES from "../../types";
import { CreateDomainsUseCaseInterface } from "../../usecases/domains/contracts/CreateDomainsUseCaseInterface";
import { DeleteDomainsUseCaseInterface } from "../../usecases/domains/contracts/DeleteDomainsUseCaseInterface";
import { FindByIdDomainsUseCaseInterface } from "../../usecases/domains/contracts/FindByIdDomainsUseCaseInterface";
import { GetDomainsUseCaseInterface } from "../../usecases/domains/contracts/GetDomainsUseCaseInterface";
import { UpdateDomainsUseCaseInterface } from "../../usecases/domains/contracts/UpdateDomainsUseCaseInterface";

describe("Unit Tests for DomainsUseCases", () => {
    let domainRepository: DomainRepositoryInterface;
    let createDomainsUseCase: CreateDomainsUseCaseInterface;
    let getDomainsUseCase: GetDomainsUseCaseInterface;
    let findByIdDomainUSeCase: FindByIdDomainsUseCaseInterface;
    let updateUseUseCase: UpdateDomainsUseCaseInterface;
    let deleteDomainUseCase: DeleteDomainsUseCaseInterface;

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
        domainRepository = container.get<DomainRepositoryInterface>(TYPES.DomainRepositoryInterface);
        createDomainsUseCase = container.get<CreateDomainsUseCaseInterface>(TYPES.CreateDomainsUseCaseInterface);
        getDomainsUseCase = container.get<GetDomainsUseCaseInterface>(TYPES.GetDomainsUseCaseInterface);
        findByIdDomainUSeCase = container.get<FindByIdDomainsUseCaseInterface>(TYPES.FindByIdDomainsUseCaseInterface);
        updateUseUseCase = container.get<UpdateDomainsUseCaseInterface>(TYPES.UpdateDomainsUseCaseInterface);
        deleteDomainUseCase = container.get<DeleteDomainsUseCaseInterface>(TYPES.DeleteDomainsUseCaseInterface);
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
