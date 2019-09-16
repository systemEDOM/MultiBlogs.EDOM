import {Container} from 'inversify';
import { DomainRepositoryImpl } from './repository/Domain/DomainRepositoryImpl';
import { DomainRepositoryInterface } from './repository/Domain/DomainRepositoryInterface';
import { interfaces, TYPE } from 'inversify-express-utils';
import { DomainController } from './controllers/DomainController';
import TYPES from './types';
import { GetDomainsUseCaseInterface } from './usescases/domains/contracts/GetDomainsUseCaseInterface';
import { GetDomainsUseCaseImpl } from './usescases/domains/GetDomainsUseCaseImpl';
import { CreateDomainsUseCaseImpl } from './usescases/domains/CreateDomainsUseCaseImpl';
import { CreateDomainsUseCaseInterface } from './usescases/domains/contracts/CreateDomansUseCaseInterface';
import { FindByIdDomainsUseCaseInterface } from './usescases/domains/contracts/FindByIdDomainsUseCaseInterface';
import { UpdateDomainsUseCaseInterface } from './usescases/domains/contracts/UpdateDomainsUseCaseInterface';
import { DeleteDomainsUseCaseInterface } from './usescases/domains/contracts/DeleteDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseImpl } from './usescases/domains/FindByIdDomainsUseCaseImpl';
import { UpdateDomainsUseCaseImpl } from './usescases/domains/UpdateDomainsUseCaseImpl';
import { DeleteDomainsUseCaseImpl } from './usescases/domains/DeleteDomainsUseCaseImpl';

const container = new Container();

//controllers
container.bind<interfaces.Controller>(TYPE.Controller).to(DomainController).inSingletonScope().whenTargetNamed('DomainController'); 

//repositories
container.bind<DomainRepositoryInterface>(TYPES.DomainRepositoryInterface).to(DomainRepositoryImpl).inSingletonScope();

//usescase

//domains
container.bind<GetDomainsUseCaseInterface>(TYPES.GetDomainsUseCaseInterface).to(GetDomainsUseCaseImpl).inSingletonScope();
container.bind<CreateDomainsUseCaseInterface>(TYPES.CreateDomainsUseCaseInterface).to(CreateDomainsUseCaseImpl).inSingletonScope();
container.bind<FindByIdDomainsUseCaseInterface>(TYPES.FindByIdDomainsUseCaseInterface).to(FindByIdDomainsUseCaseImpl).inSingletonScope();
container.bind<UpdateDomainsUseCaseInterface>(TYPES.UpdateDomainsUseCaseInterface).to(UpdateDomainsUseCaseImpl).inSingletonScope();
container.bind<DeleteDomainsUseCaseInterface>(TYPES.DeleteDomainsUseCaseInterface).to(DeleteDomainsUseCaseImpl).inSingletonScope();

export default container;