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
import { PostRepositoryInterface } from './repository/Post/PostRepositoryInterface';
import { PostRepositoryImpl } from './repository/Post/PostRepositoryImpl';
import { GetPostsUseCaseInterface } from './usecases/posts/contracts/GetPostsUseCaseInterface';
import { CreatePostsUseCaseInterface } from './usecases/posts/contracts/CreatePostsUseCaseInterface';
import { FindByIdPostsUseCaseInterface } from './usecases/posts/contracts/FindByIdPostsUseCaseInterface';
import { UpdatePostsUseCaseInterface } from './usecases/posts/contracts/UpdatePostsUseCaseInterface';
import { DeletePostsUseCaseInterface } from './usecases/posts/contracts/DeletePostsUseCaseInterface';
import { GetPostsUseCaseImpl } from './usecases/posts/GetPostsUseCaseImpl';
import { CreatePostsUseCaseImpl } from './usecases/posts/CreatePostsUseCaseImpl';
import { FindByIdPostsUseCaseImpl } from './usecases/posts/FIndByIdPostsUseCaseImpl';
import { UpdatePostsUseCaseImpl } from './usecases/posts/UpdatePostsUseCaseImpl';
import { DeletePostsUseCaseImpl } from './usecases/posts/DeletePostsUseCaseImpl';
import { PostController } from './controllers/PostController';
import { LoginController } from './controllers/LoginController';

const container = new Container();

//controllers
container.bind<interfaces.Controller>(TYPE.Controller).to(DomainController).inSingletonScope().whenTargetNamed('DomainController'); 
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).inSingletonScope().whenTargetNamed('UserController'); 
container.bind<interfaces.Controller>(TYPE.Controller).to(PostController).inSingletonScope().whenTargetNamed('PostController'); 
container.bind<interfaces.Controller>(TYPE.Controller).to(LoginController).inSingletonScope().whenTargetNamed('LoginController'); 

//Repositories
//Domain
container.bind<DomainRepositoryInterface>(TYPES.DomainRepositoryInterface).to(DomainRepositoryImpl).inSingletonScope();
container.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepositoryImpl).inSingletonScope();
container.bind<PostRepositoryInterface>(TYPES.PostRepositoryInterface).to(PostRepositoryImpl).inSingletonScope();



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

//Posts
container.bind<GetPostsUseCaseInterface>(TYPES.GetPostsUseCaseInterface).to(GetPostsUseCaseImpl).inSingletonScope();
container.bind<CreatePostsUseCaseInterface>(TYPES.CreatePostsUseCaseInterface).to(CreatePostsUseCaseImpl).inSingletonScope();
container.bind<FindByIdPostsUseCaseInterface>(TYPES.FindByIdPostsUseCaseInterface).to(FindByIdPostsUseCaseImpl).inSingletonScope();
container.bind<UpdatePostsUseCaseInterface>(TYPES.UpdatePostsUseCaseInterface).to(UpdatePostsUseCaseImpl).inSingletonScope();
container.bind<DeletePostsUseCaseInterface>(TYPES.DeletePostsUseCaseInterface).to(DeletePostsUseCaseImpl).inSingletonScope();

export default container;