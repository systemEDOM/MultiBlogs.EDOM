import TYPES from './types';

import {Container} from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';

import { DomainRepositoryImpl } from './repository/Domain/DomainRepositoryImpl';
import { DomainRepositoryInterface } from './repository/Domain/DomainRepositoryInterface';

import { DomainController } from './controllers/DomainController';
import { GetDomainsUseCaseInterface } from './usescases/domains/contracts/GetDomainsUseCaseInterface';
import { GetDomainsUseCaseImpl } from './usescases/domains/GetDomainsUseCaseImpl';
import { CreateDomainsUseCaseImpl } from './usescases/domains/CreateDomainsUseCaseImpl';
import { CreateDomainsUseCaseInterface } from './usescases/domains/contracts/CreateDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseInterface } from './usescases/domains/contracts/FindByIdDomainsUseCaseInterface';
import { UpdateDomainsUseCaseInterface } from './usescases/domains/contracts/UpdateDomainsUseCaseInterface';
import { DeleteDomainsUseCaseInterface } from './usescases/domains/contracts/DeleteDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseImpl } from './usescases/domains/FindByIdDomainsUseCaseImpl';
import { UpdateDomainsUseCaseImpl } from './usescases/domains/UpdateDomainsUseCaseImpl';
import { DeleteDomainsUseCaseImpl } from './usescases/domains/DeleteDomainsUseCaseImpl';

import { UserController } from './controllers/UserController';
import { UserRepositoryImpl } from './repository/User/UserRepositoryImpl';
import { UserRepositoryInterface } from './repository/User/UserRepositoryInterface';
import { GetUsersUseCaseInterface } from './usescases/users/contracts/GetUsersUseCaseInterface';
import { GetUsersUseCaseImpl } from './usescases/users/GetUsersUseCaseImpl';
import { CreateUsersUseCaseInterface } from './usescases/users/contracts/CreateUsersUseCaseInterface';
import { CreateUsersUseCaseImpl } from './usescases/users/CreateUsersUseCaseImpl';
import { FindByIdUsersUseCaseInterface } from './usescases/users/contracts/FindByIdUsersUseCaseInterface';
import { UpdateUsersUseCaseInterface } from './usescases/users/contracts/UpdateUsersUseCaseInterface';
import { UpdateUsersUseCaseImpl } from './usescases/users/UpdateUsersUseCaseImpl';
import { DeleteUsersUseCaseInterface } from './usescases/users/contracts/DeleteUsersUseCaseInterface';
import { DeleteUsersUseCaseImpl } from './usescases/users/DeleteUsersUseCaseImpl';
import { FindByUsernameUsersUseCaseImpl } from './usescases/users/FindByUsernameUsersUseCaseImpl';
import { FindByUsernameUsersUseCaseInterface } from './usescases/users/contracts/FindByUsernameUsersUseCaseInterface';
import { FindByIdUsersUseCaseImpl } from './usescases/users/FindByIdUsersUseCaseImpl';

const container = new Container();

//controllers
container.bind<interfaces.Controller>(TYPE.Controller).to(DomainController).inSingletonScope().whenTargetNamed('DomainController'); 
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).inSingletonScope().whenTargetNamed('UserController'); 

//Repositories
//Domain
container.bind<DomainRepositoryInterface>(TYPES.DomainRepositoryInterface).to(DomainRepositoryImpl).inSingletonScope();
container.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepositoryImpl).inSingletonScope();



//Usescase
//Domains
container.bind<GetDomainsUseCaseInterface>(TYPES.GetDomainsUseCaseInterface).to(GetDomainsUseCaseImpl).inSingletonScope();
container.bind<CreateDomainsUseCaseInterface>(TYPES.CreateDomainsUseCaseInterface).to(CreateDomainsUseCaseImpl).inSingletonScope();
container.bind<FindByIdDomainsUseCaseInterface>(TYPES.FindByIdDomainsUseCaseInterface).to(FindByIdDomainsUseCaseImpl).inSingletonScope();
container.bind<UpdateDomainsUseCaseInterface>(TYPES.UpdateDomainsUseCaseInterface).to(UpdateDomainsUseCaseImpl).inSingletonScope();
container.bind<DeleteDomainsUseCaseInterface>(TYPES.DeleteDomainsUseCaseInterface).to(DeleteDomainsUseCaseImpl).inSingletonScope();

//Users
container.bind<GetUsersUseCaseInterface>(TYPES.GetUsersUseCaseInterface).to(GetUsersUseCaseImpl).inSingletonScope();
container.bind<CreateUsersUseCaseInterface>(TYPES.CreateUsersUseCaseInterface).to(CreateUsersUseCaseImpl).inSingletonScope();
container.bind<FindByIdUsersUseCaseInterface>(TYPES.FindByIdUsersUseCaseInterface).to(FindByIdUsersUseCaseImpl).inSingletonScope();
container.bind<FindByUsernameUsersUseCaseInterface>(TYPES.FindByUsernameUsersUseCaseInterface).to(FindByUsernameUsersUseCaseImpl).inSingletonScope();
container.bind<UpdateUsersUseCaseInterface>(TYPES.UpdateUsersUseCaseInterface).to(UpdateUsersUseCaseImpl).inSingletonScope();
container.bind<DeleteUsersUseCaseInterface>(TYPES.DeleteUsersUseCaseInterface).to(DeleteUsersUseCaseImpl).inSingletonScope();

export default container;