//import "reflect-metadata";
import 'reflect-metadata';
import container from '../../inversify.config';
import * as typeorm from 'typeorm';
import TYPES from '../../types';
import slugify from 'slugify';
import { Domain } from '../../entity/Domain';
import { DomainRepositoryInterface } from '../../repository/Domain/DomainRepositoryInterface';
import { CreateDomainsUseCaseInterface } from '../../usecases/domains/contracts/CreateDomainsUseCaseInterface';
import { GetDomainsUseCaseInterface } from '../../usecases/domains/contracts/GetDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseInterface } from '../../usecases/domains/contracts/FindByIdDomainsUseCaseInterface';
import { UpdateDomainsUseCaseInterface } from '../../usecases/domains/contracts/UpdateDomainsUseCaseInterface';
import { DeleteDomainsUseCaseInterface } from '../../usecases/domains/contracts/DeleteDomainsUseCaseInterface';

describe('Unit Tests for DomainsUseCases', () => {
    let domainRepository: DomainRepositoryInterface;
    let createDomainsUseCase: CreateDomainsUseCaseInterface;
    let getDomainsUseCase: GetDomainsUseCaseInterface;
    let findByIdDomainUSeCase: FindByIdDomainsUseCaseInterface;
    let updateUseUseCase: UpdateDomainsUseCaseInterface;
    let deleteDomainUseCase: DeleteDomainsUseCaseInterface;

    let domainData = new Domain();
    domainData.name = slugify("prueba domain");
    domainData.url = "http://google.com.mx";
    
    let domainResultData = new Domain();
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

    it('handle() should be return an array of objects instances of Domain', () => {
        let result = getDomainsUseCase.handle();
        expect([].push(domainData)).toEqual(result);
    });

    it('handle(data) should be return an instance of Domain correctly', () => {
        let result = createDomainsUseCase.handle(domainData);
        expect(domainResultData).toEqual(result);
    });

    it('handle(id) should be return an instance of Domain correctly By Id', () => {
        let id = 1;
        let result = findByIdDomainUSeCase.handle(id);
        expect(id).toEqual(result.id);
    });

    it('handle(id, data) should be return a number of changedRows >= 1', () => {
        let id = 1;
        let result = updateUseUseCase.handle(id, domainData);
        expect(1).toEqual(result.raw.changedRows);
    });

    it('handle(id) should be return a number of changedRows >= 1', () => {
        let id = 1;
        let result = deleteDomainUseCase.handle(id);
        expect(1).toEqual(result.raw.changedRows);
    });
});