import TYPES from "./types";

import {Container} from "inversify";

import { DomainRepository } from "./core/domain/interfaces/DomainRepository";
import { DomainRepositoryImpl } from "./infrastructure/repositories/Domain/DomainRepositoryImpl";

import { CreateDomainUseCase } from "./core/application/usecases/domains/Contracts/CreateDomainUseCase";
import { DeleteDomainUseCase } from "./core/application/usecases/domains/Contracts/DeleteDomainUseCase";
import { FindByIdDomainUseCase } from "./core/application/usecases/domains/Contracts/FindByIdDomainUseCase";
import { GetDomainsUseCase } from "./core/application/usecases/domains/Contracts/GetDomainsUseCase";
import { UpdateDomainsUseCase } from "./core/application/usecases/domains/Contracts/UpdateDomainsUseCase";
import { CreateDomainUseCaseImpl } from "./core/application/usecases/domains/CreateDomainUseCaseImpl";
import { DeleteDomainUseCaseImpl } from "./core/application/usecases/domains/DeleteDomainUseCaseImpl";
import { FindByIdDomainUseCaseImpl } from "./core/application/usecases/domains/FindByIdDomainUseCaseImpl";
import { GetDomainsUseCaseImpl } from "./core/application/usecases/domains/GetDomainsUseCaseImpl";
import { UpdateDomainUseCaseImpl } from "./core/application/usecases/domains/UpdateDomainUseCaseImpl";

import { CreatePostUseCase } from "./core/application/usecases/posts/Contracts/CreatePostUseCase";
import { DeletePostUseCase } from "./core/application/usecases/posts/Contracts/DeletePostUseCase";
import { FindByIdPostUseCase } from "./core/application/usecases/posts/Contracts/FindByIdPostUseCase";
import { GetPostsUseCase } from "./core/application/usecases/posts/Contracts/GetPostsUseCase";
import { UpdatePostUseCase } from "./core/application/usecases/posts/Contracts/UpdatePostUseCase";
import { CreatePostUseCaseImpl } from "./core/application/usecases/posts/CreatePostUseCaseImpl";
import { DeletePostUseCaseImpl } from "./core/application/usecases/posts/DeletePostUseCaseImpl";
import { FIndByIdPostUseCaseImpl } from "./core/application/usecases/posts/FIndByIdPostUseCaseImpl";
import { GetPostsUseCaseImpl } from "./core/application/usecases/posts/GetPostsUseCaseImpl";
import { UpdatePostUseCaseImpl } from "./core/application/usecases/posts/UpdatePostUseCaseImpl";
import { CreateUserUseCase } from "./core/application/usecases/users/Contracts/CreateUserUseCase";
import { DeleteUserUseCase } from "./core/application/usecases/users/Contracts/DeleteUserUseCase";
import { FindByIdUserUseCase } from "./core/application/usecases/users/Contracts/FindByIdUserUseCase";
import { FindByUsernameUserUseCase } from "./core/application/usecases/users/Contracts/FindByUsernameUserUseCase";
import { GetUsersUseCase } from "./core/application/usecases/users/Contracts/GetUsersUseCase";
import { UpdateUserUseCase } from "./core/application/usecases/users/Contracts/UpdateUserUseCase";
import { CreateUserUseCaseImpl } from "./core/application/usecases/users/CreateUserUseCaseImpl";
import { DeleteUserUseCaseImpl } from "./core/application/usecases/users/DeleteUserUseCaseImpl";
import { FindByIdUserUseCaseImpl } from "./core/application/usecases/users/FindByIdUserUseCaseImpl";
import { FindByUsernameUserUseCaseImpl } from "./core/application/usecases/users/FindByUsernameUserUseCaseImpl";
import { GetUsersUseCaseImpl } from "./core/application/usecases/users/GetUsersUseCaseImpl";
import { UpdateUserUseCaseImpl } from "./core/application/usecases/users/UpdateUserUseCaseImpl";
import { PostRepository } from "./core/domain/interfaces/PostRepository";
import { UserRepository } from "./core/domain/interfaces/UserRepository";
import { PostRepositoryImpl } from "./infrastructure/repositories/Post/PostRepositoryImpl";
import { UserRepositoryImpl } from "./infrastructure/repositories/User/UserRepositoryImpl";

import { AuthMiddleware } from "./infrastructure/middlewares/AuthMiddleware";

import { SignInUseCase } from "./core/application/usecases/auth/Contracts/SignInUseCase";
import {SignInUseCaseImpl} from "./core/application/usecases/auth/SignInUseCaseImpl";
import { PermissionRepository } from "./core/domain/interfaces/PermissionRepository";
import { RoleRepository } from "./core/domain/interfaces/RoleRepository";
import { PermissionRepositoryImpl } from "./infrastructure/repositories/Permission/PermissionRepositoryImpl";
import { RoleRepositoryImpl } from "./infrastructure/repositories/Role/RoleRepositoryImpl";

const container = new Container();

container.bind<DomainRepository>(TYPES.DomainRepositoryInterface).to(DomainRepositoryImpl).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepositoryInterface).to(UserRepositoryImpl).inSingletonScope();
container.bind<PostRepository>(TYPES.PostRepositoryInterface).to(PostRepositoryImpl).inSingletonScope();
// tslint:disable-next-line:max-line-length
container.bind<PermissionRepository>(TYPES.PermissionRepositoryInterface).to(PermissionRepositoryImpl).inSingletonScope();
container.bind<RoleRepository>(TYPES.RoleRepositoryInterface).to(RoleRepositoryImpl).inSingletonScope();

container.bind<GetDomainsUseCase<any>>(TYPES.GetDomainsUseCaseInterface).to(GetDomainsUseCaseImpl).inSingletonScope();
container.bind<CreateDomainUseCase<any>>(TYPES.CreateDomainsUseCaseInterface).to(CreateDomainUseCaseImpl).inSingletonScope();
container.bind<FindByIdDomainUseCase<any>>(TYPES.FindByIdDomainsUseCaseInterface).to(FindByIdDomainUseCaseImpl).inSingletonScope();
container.bind<UpdateDomainsUseCase<any>>(TYPES.UpdateDomainsUseCaseInterface).to(UpdateDomainUseCaseImpl).inSingletonScope();
container.bind<DeleteDomainUseCase<any>>(TYPES.DeleteDomainsUseCaseInterface).to(DeleteDomainUseCaseImpl).inSingletonScope();

container.bind<GetUsersUseCase<any>>(TYPES.GetUsersUseCaseInterface).to(GetUsersUseCaseImpl).inSingletonScope();
container.bind<CreateUserUseCase<any>>(TYPES.CreateUsersUseCaseInterface).to(CreateUserUseCaseImpl).inSingletonScope();
container.bind<FindByIdUserUseCase<any>>(TYPES.FindByIdUsersUseCaseInterface).to(FindByIdUserUseCaseImpl).inSingletonScope();
container.bind<FindByUsernameUserUseCase<any>>(TYPES.FindByUsernameUsersUseCaseInterface).to(FindByUsernameUserUseCaseImpl).inSingletonScope();
container.bind<UpdateUserUseCase<any>>(TYPES.UpdateUsersUseCaseInterface).to(UpdateUserUseCaseImpl).inSingletonScope();
container.bind<DeleteUserUseCase<any>>(TYPES.DeleteUsersUseCaseInterface).to(DeleteUserUseCaseImpl).inSingletonScope();

container.bind<GetPostsUseCase<any>>(TYPES.GetPostsUseCaseInterface).to(GetPostsUseCaseImpl).inSingletonScope();
container.bind<CreatePostUseCase<any>>(TYPES.CreatePostsUseCaseInterface).to(CreatePostUseCaseImpl).inSingletonScope();
container.bind<FindByIdPostUseCase<any>>(TYPES.FindByIdPostsUseCaseInterface).to(FIndByIdPostUseCaseImpl).inSingletonScope();
container.bind<UpdatePostUseCase<any>>(TYPES.UpdatePostsUseCaseInterface).to(UpdatePostUseCaseImpl).inSingletonScope();
container.bind<DeletePostUseCase<any>>(TYPES.DeletePostsUseCaseInterface).to(DeletePostUseCaseImpl).inSingletonScope();

container.bind<SignInUseCase<any>>(TYPES.AuthService).to(SignInUseCaseImpl).inSingletonScope();

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();

export default container;
