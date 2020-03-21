// import "reflect-metadata";
import "reflect-metadata";
import slugify from "slugify";
import * as typeorm from "typeorm";
import container from "../../src/inversify.config";
import TYPES from "../../src/types";
import { CreateDomainUseCase } from "../../src/core/application/usecases/domains/CreateDomainUseCase";
import { GetDomainsUseCase } from "../../src/core/application/usecases/domains/GetDomainsUseCase";
import { FindByIdDomainUseCase } from "../../src/core/application/usecases/domains/FindByIdDomainUseCase";
import { UpdateDomainUseCase } from "../../src/core/application/usecases/domains/UpdateDomainUseCase";
import { DeleteDomainUseCase } from "../../src/core/application/usecases/domains/DeleteDomainUseCase";
import { Domain } from "../../src/infrastructure/entities/Domain";
import { DomainRepository } from "../../src/core/domain/interfaces/DomainRepository";

describe("Tests for Domains Module", () => {

    let domainRepository: DomainRepository;

    let createDomainUseCase: CreateDomainUseCase;
    let getDomainsUseCase: GetDomainsUseCase;
    let findByIdDomainUSeCase: FindByIdDomainUseCase;
    let updateDomainUseUseCase: UpdateDomainUseCase;
    let deleteDomainUseCase: DeleteDomainUseCase;

    const domainData = new Domain();
    domainData.name = "prueba domain";
    domainData.url = "http://google.com.mx";

    const domainResultData = new Domain();
    domainResultData.id = 1;
    domainResultData.name = "prueba domain";
    domainResultData.slug = slugify(domainResultData.name);
    domainResultData.url = "http://google.com.mx";

    beforeEach(() => {
        (typeorm as any).getRepository = jest.fn();
        (typeorm as any).getRepository.mockReturnValue({
            find: () => [].push(domainResultData),
            create: data => data,
            save: data => {
                data.id = 1;
                return data;
            },
            update: data => data,
            findOneOrFail: id => domainResultData,
            delete: id => domainResultData,
        });
        createDomainUseCase = container.get<CreateDomainUseCase>(TYPES.CreateDomainUseCase);
        getDomainsUseCase = container.get<GetDomainsUseCase>(TYPES.GetDomainsUseCase);
        findByIdDomainUSeCase = container.get<FindByIdDomainUseCase>(TYPES.FindByIdDomainUseCase);
        updateDomainUseUseCase = container.get<UpdateDomainUseCase>(TYPES.UpdateDomainUseCase);
        deleteDomainUseCase = container.get<DeleteDomainUseCase>(TYPES.DeleteDomainUseCase);
        domainRepository = container.get<DomainRepository>(TYPES.DomainRepositoryInterface);
    });

    it("execute() should be return an array of Domain instances", () => {
        const result = getDomainsUseCase.execute();
        expect(result.then( domains => domains )).toEqual([].push(domainData));
    });

    it("execute(data) should be return an instance of Domain with properties correctly", async () => {
        const result = await createDomainUseCase.execute(domainData);
        result.slug = slugify(result.name);
        expect(result).toEqual(domainResultData);
    });

    it("execute(id) should be return an instance of Domain correctly by id", () => {
        const id = 1;
        const result = findByIdDomainUSeCase.execute(id);
        expect(result.then( domain => domain.id)).toEqual(id);
    });

    it("execute(id, data) should be return a Domain instance updated", () => {
        const id = 1;
        const result = updateDomainUseUseCase.execute(id, domainData);
        expect(result.then( domain => domain.id )).toEqual(1);
    });

    it("execute(id) should be return a Domain instace if it was deleted correctly", () => {
        const result = deleteDomainUseCase.execute(1);
        expect(result.then(domain => domain.id)).toEqual(1);
    });
});
