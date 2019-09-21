import TYPES from './types';

import {Container} from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';

import { DomainRepositoryImpl } from './repository/Domain/DomainRepositoryImpl';
import { DomainRepositoryInterface } from './repository/Domain/DomainRepositoryInterface';

import { DomainController } from './controllers/DomainController';
import { GetDomainsUseCaseInterface } from './usecases/domains/contracts/GetDomainsUseCaseInterface';
import { GetDomainsUseCaseImpl } from './usecases/domains/GetDomainsUseCaseImpl';
import { CreateDomainsUseCaseImpl } from './usecases/domains/CreateDomainsUseCaseImpl';
import { CreateDomainsUseCaseInterface } from './usecases/domains/contracts/CreateDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseInterface } from './usecases/domains/contracts/FindByIdDomainsUseCaseInterface';
import { UpdateDomainsUseCaseInterface } from './usecases/domains/contracts/UpdateDomainsUseCaseInterface';
import { DeleteDomainsUseCaseInterface } from './usecases/domains/contracts/DeleteDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseImpl } from './usecases/domains/FindByIdDomainsUseCaseImpl';
import { UpdateDomainsUseCaseImpl } from './usecases/domains/UpdateDomainsUseCaseImpl';
import { DeleteDomainsUseCaseImpl } from './usecases/domains/DeleteDomainsUseCaseImpl';

import { UserController } from './controllers/UserController';
import { UserRepositoryImpl } from './repository/User/UserRepositoryImpl';
import { UserRepositoryInterface } from './repository/User/UserRepositoryInterface';
import { GetUsersUseCaseInterface } from './usecases/users/contracts/GetUsersUseCaseInterface';
import { GetUsersUseCaseImpl } from './usecases/users/GetUsersUseCaseImpl';
import { CreateUsersUseCaseInterface } from './usecases/users/contracts/CreateUsersUseCaseInterface';
import { CreateUsersUseCaseImpl } from './usecases/users/CreateUsersUseCaseImpl';
import { FindByIdUsersUseCaseInterface } from './usecases/users/contracts/FindByIdUsersUseCaseInterface';
import { UpdateUsersUseCaseInterface } from './usecases/users/contracts/UpdateUsersUseCaseInterface';
import { UpdateUsersUseCaseImpl } from './usecases/users/UpdateUsersUseCaseImpl';
import { DeleteUsersUseCaseInterface } from './usecases/users/contracts/DeleteUsersUseCaseInterface';
import { DeleteUsersUseCaseImpl } from './usecases/users/DeleteUsersUseCaseImpl';
import { FindByUsernameUsersUseCaseImpl } from './usecases/users/FindByUsernameUsersUseCaseImpl';
import { FindByUsernameUsersUseCaseInterface } from './usecases/users/contracts/FindByUsernameUsersUseCaseInterface';
import { FindByIdUsersUseCaseImpl } from './usecases/users/FindByIdUsersUseCaseImpl';

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