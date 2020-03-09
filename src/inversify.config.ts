import TYPES from './types';

import {Container} from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';

import { DomainRepositoryImpl } from './infrastructure/repository/Domain/DomainRepositoryImpl';
import { DomainRepository } from './core/domain/interfaces/DomainRepository';

import { GetDomainsUseCase } from './core/application/usecases/domains/GetDomainsUseCase';
import { GetDomainsUseCaseImpl } from './infrastructure/usecases/domains/GetDomainsUseCaseImpl';
import { CreateDomainsUseCaseImpl } from './infrastructure/usecases/domains/CreateDomainsUseCaseImpl';
import { CreateDomainUseCase } from './core/application/usecases/domains/CreateDomainUseCase';
import { FindByIdDomainUseCase } from './core/application/usecases/domains/FindByIdDomainUseCase';
import { UpdateDomainsUseCase } from './core/application/usecases/domains/UpdateDomainsUseCase';
import { DeleteDomainUseCase } from './core/application/usecases/domains/DeleteDomainUseCase';
import { FindByIdDomainsUseCaseImpl } from './infrastructure/usecases/domains/FindByIdDomainsUseCaseImpl';
import { UpdateDomainsUseCaseImpl } from './infrastructure/usecases/domains/UpdateDomainsUseCaseImpl';
import { DeleteDomainsUseCaseImpl } from './infrastructure/usecases/domains/DeleteDomainsUseCaseImpl';

import { UserRepositoryImpl } from './infrastructure/repository/User/UserRepositoryImpl';
import { UserRepository } from './core/domain/interfaces/UserRepository';
import { GetUsersUseCase } from './core/application/usecases/users/GetUsersUseCase';
import { GetUsersUseCaseImpl } from './infrastructure/usecases/users/GetUsersUseCaseImpl';
import { CreateUserUseCase } from './core/application/usecases/users/CreateUserUseCase';
import { CreateUsersUseCaseImpl } from './infrastructure/usecases/users/CreateUsersUseCaseImpl';
import { FindByIdUserUseCase } from './core/application/usecases/users/FindByIdUserUseCase';
import { UpdateUserUseCase } from './core/application/usecases/users/UpdateUserUseCase';
import { UpdateUsersUseCaseImpl } from './infrastructure/usecases/users/UpdateUsersUseCaseImpl';
import { DeleteUserUseCase } from './core/application/usecases/users/DeleteUserUseCase';
import { DeleteUsersUseCaseImpl } from './infrastructure/usecases/users/DeleteUsersUseCaseImpl';
import { FindByUsernameUsersUseCaseImpl } from './infrastructure/usecases/users/FindByUsernameUsersUseCaseImpl';
import { FindByUsernameUserUseCase } from './core/application/usecases/users/FindByUsernameUserUseCase';
import { FindByIdUsersUseCaseImpl } from './infrastructure/usecases/users/FindByIdUsersUseCaseImpl';
import { PostRepository } from './core/domain/interfaces/PostRepository';
import { PostRepositoryImpl } from './infrastructure/repository/Post/PostRepositoryImpl';
import { GetPostUseCase } from './core/application/usecases/posts/GetPostsUseCase';
import { CreatePostUseCase } from './core/application/usecases/posts/CreatePostUseCase';
import { FindByIdPostUseCase } from './core/application/usecases/posts/FindByIdPostUseCase';
import { UpdatePostUseCase } from './core/application/usecases/posts/UpdatePostUseCase';
import { DeletePostUseCase } from './core/application/usecases/posts/DeletePostUseCase';
import { GetPostsUseCaseImpl } from './infrastructure/usecases/posts/GetPostsUseCaseImpl';
import { CreatePostsUseCaseImpl } from './infrastructure/usecases/posts/CreatePostsUseCaseImpl';
import { FindByIdPostsUseCaseImpl } from './infrastructure/usecases/posts/FIndByIdPostsUseCaseImpl';
import { UpdatePostsUseCaseImpl } from './infrastructure/usecases/posts/UpdatePostsUseCaseImpl';
import { DeletePostsUseCaseImpl } from './infrastructure/usecases/posts/DeletePostsUseCaseImpl';

import { AuthMiddleware } from './infrastructure/middlewares/AuthMiddleware';

import { SignInUseCase } from './core/application/usecases/auth/SignInUseCase';
import { AuthServiceImpl } from './infrastructure/services/AuthService/AuthServiceImpl';
import { PermissionRepository } from './core/domain/interfaces/PermissionRepository';
import { PermissionRepositoryImpl } from './infrastructure/repository/Permission/PermissionRepositoryImpl';
import { PermissionService } from './core/application/services/interfaces/PermissionService';
import { PermissionServiceImpl } from './infrastructure/services/PermissionService/PermissionServiceImpl';
import { RoleRepository } from './core/domain/interfaces/RoleRepository';
import { RoleRepositoryImpl } from './infrastructure/repository/Role/RoleRepositoryImpl';
import { RoleServiceImpl } from './infrastructure/services/RoleService/RoleServiceImpl';
import { RoleService } from './core/application/services/interfaces/RoleService';
//import { PermissionMiddleware } from './middlewares/PermissionMiddleware';

const container = new Container();

//Repositories
<<<<<<< Updated upstream
container.bind<DomainRepository>(TYPES.DomainRepositoryInterface).to(DomainRepositoryImpl).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepositoryInterface).to(UserRepositoryImpl).inSingletonScope();
container.bind<PostRepository>(TYPES.PostRepositoryInterface).to(PostRepositoryImpl).inSingletonScope();
container.bind<PermissionRepository>(TYPES.PermissionRepositoryInterface).to(PermissionRepositoryImpl).inSingletonScope();
container.bind<RoleRepository>(TYPES.RoleRepositoryInterface).to(RoleRepositoryImpl).inSingletonScope();
=======
container.getAll().bind<DomainRepositoryInterface>(TYPES.DomainRepositoryInterface).to(DomainRepositoryImpl).inSingletonScope();
container.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepositoryImpl).inSingletonScope();
container.bind<PostRepositoryInterface>(TYPES.PostRepositoryInterface).to(PostRepositoryImpl).inSingletonScope();
container.bind<PermissionRepositoryInterface>(TYPES.PermissionRepositoryInterface).to(PermissionRepositoryImpl).inSingletonScope();
container.bind<RoleRepositoryInterface>(TYPES.RoleRepositoryInterface).to(RoleRepositoryImpl).inSingletonScope();
>>>>>>> Stashed changes



//Usescase
//Domains
container.bind<GetDomainsUseCase>(TYPES.GetDomainsUseCaseInterface).to(GetDomainsUseCaseImpl).inSingletonScope();
container.bind<CreateDomainUseCase>(TYPES.CreateDomainsUseCaseInterface).to(CreateDomainsUseCaseImpl).inSingletonScope();
container.bind<FindByIdDomainUseCase>(TYPES.FindByIdDomainsUseCaseInterface).to(FindByIdDomainsUseCaseImpl).inSingletonScope();
container.bind<UpdateDomainsUseCase>(TYPES.UpdateDomainsUseCaseInterface).to(UpdateDomainsUseCaseImpl).inSingletonScope();
container.bind<DeleteDomainUseCase>(TYPES.DeleteDomainsUseCaseInterface).to(DeleteDomainsUseCaseImpl).inSingletonScope();

//Users
container.bind<GetUsersUseCase>(TYPES.GetUsersUseCaseInterface).to(GetUsersUseCaseImpl).inSingletonScope();
container.bind<CreateUserUseCase>(TYPES.CreateUsersUseCaseInterface).to(CreateUsersUseCaseImpl).inSingletonScope();
container.bind<FindByIdUserUseCase>(TYPES.FindByIdUsersUseCaseInterface).to(FindByIdUsersUseCaseImpl).inSingletonScope();
container.bind<FindByUsernameUserUseCase>(TYPES.FindByUsernameUsersUseCaseInterface).to(FindByUsernameUsersUseCaseImpl).inSingletonScope();
container.bind<UpdateUserUseCase>(TYPES.UpdateUsersUseCaseInterface).to(UpdateUsersUseCaseImpl).inSingletonScope();
container.bind<DeleteUserUseCase>(TYPES.DeleteUsersUseCaseInterface).to(DeleteUsersUseCaseImpl).inSingletonScope();

//Posts
container.bind<GetPostUseCase>(TYPES.GetPostsUseCaseInterface).to(GetPostsUseCaseImpl).inSingletonScope();
container.bind<CreatePostUseCase>(TYPES.CreatePostsUseCaseInterface).to(CreatePostsUseCaseImpl).inSingletonScope();
container.bind<FindByIdPostUseCase>(TYPES.FindByIdPostsUseCaseInterface).to(FindByIdPostsUseCaseImpl).inSingletonScope();
container.bind<UpdatePostUseCase>(TYPES.UpdatePostsUseCaseInterface).to(UpdatePostsUseCaseImpl).inSingletonScope();
container.bind<DeletePostUseCase>(TYPES.DeletePostsUseCaseInterface).to(DeletePostsUseCaseImpl).inSingletonScope();


//Services
container.bind<SignInUseCase>(TYPES.AuthService).to(AuthServiceImpl).inSingletonScope();
container.bind<PermissionService>(TYPES.PermissionService).to(PermissionServiceImpl).inSingletonScope();
container.bind<RoleService>(TYPES.RoleService).to(RoleServiceImpl).inSingletonScope();


//Middlewares
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();


export default container;