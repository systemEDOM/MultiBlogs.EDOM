import TYPES from "./types";

import {Container, decorate, injectable, inject} from "inversify";

import { DomainRepository } from "./core/domain/interfaces/DomainRepository";
import { DomainRepositoryImpl } from "./infrastructure/repositories/Domain/DomainRepositoryImpl";

import { CreateDomainUseCase } from "./core/application/usecases/domains/CreateDomainUseCase";
import { DeleteDomainUseCase } from "./core/application/usecases/domains/DeleteDomainUseCase";
import { FindByIdDomainUseCase } from "./core/application/usecases/domains/FindByIdDomainUseCase";
import { GetDomainsUseCase } from "./core/application/usecases/domains/GetDomainsUseCase";
import { UpdateDomainUseCase } from "./core/application/usecases/domains/UpdateDomainUseCase";

import { CreatePostUseCase } from "./core/application/usecases/posts/CreatePostUseCase";
import { DeletePostUseCase } from "./core/application/usecases/posts/DeletePostUseCase";
import { FindByIdPostUseCase } from "./core/application/usecases/posts/FindByIdPostUseCase";
import { GetPostsUseCase } from "./core/application/usecases/posts/GetPostsUseCase";
import { UpdatePostUseCase } from "./core/application/usecases/posts/UpdatePostUseCase";
import { CreateUserUseCase } from "./core/application/usecases/users/CreateUserUseCase";
import { DeleteUserUseCase } from "./core/application/usecases/users/DeleteUserUseCase";
import { FindByIdUserUseCase } from "./core/application/usecases/users/FindByIdUserUseCase";
import { FindByUsernameUserUseCase } from "./core/application/usecases/users/FindByUsernameUserUseCase";
import { GetUsersUseCase } from "./core/application/usecases/users/GetUsersUseCase";
import { UpdateUserUseCase } from "./core/application/usecases/users/UpdateUserUseCase";
import { PostRepository } from "./core/domain/interfaces/PostRepository";
import { UserRepository } from "./core/domain/interfaces/UserRepository";
import { PostRepositoryImpl } from "./infrastructure/repositories/Post/PostRepositoryImpl";
import { UserRepositoryImpl } from "./infrastructure/repositories/User/UserRepositoryImpl";

import { AuthMiddleware } from "./infrastructure/middlewares/AuthMiddleware";

import { SignInUseCase } from "./core/application/usecases/auth/SignInUseCase";
import { PermissionRepository } from "./core/domain/interfaces/PermissionRepository";
import { RoleRepository } from "./core/domain/interfaces/RoleRepository";
import { PermissionRepositoryImpl } from "./infrastructure/repositories/Permission/PermissionRepositoryImpl";
import { RoleRepositoryImpl } from "./infrastructure/repositories/Role/RoleRepositoryImpl";
import { GenericRepositoryImpl } from "./infrastructure/repositories/GenericRepositoryImpl";
import { GenericRepository } from "./core/domain/interfaces/GenericRepository";
import { GetPermissionsUseCase } from "./core/application/usecases/permissions/GetPermissionsUseCase";
import { CreatePermissionUseCase } from "./core/application/usecases/permissions/CreatePermissionUseCase";
import { DeletePermissionUseCase } from "./core/application/usecases/permissions/DeletePermissionUseCase";
import { FindByIdPermissionUseCase } from "./core/application/usecases/permissions/FindByIdPermissionUseCase";
import { UpdatePermissionUseCase } from "./core/application/usecases/permissions/UpdatePermissionUseCase";
import { CreateRoleUseCase } from "./core/application/usecases/roles/CreateRoleUseCase";
import { FindByIdRoleUseCase } from "./core/application/usecases/roles/FindByIdRoleUseCase";
import { UpdateRoleUseCase } from "./core/application/usecases/roles/UpdateRoleUseCase";
import { DeleteRoleUseCase } from "./core/application/usecases/roles/DeleteRoleUseCase";
import { GetRolesUseCase } from "./core/application/usecases/roles/GetRolesUseCase";

const container = new Container();

container.bind<DomainRepository>(TYPES.DomainRepositoryInterface).to(DomainRepositoryImpl).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepositoryInterface).to(UserRepositoryImpl).inSingletonScope();
container.bind<PostRepository>(TYPES.PostRepositoryInterface).to(PostRepositoryImpl).inSingletonScope();
// tslint:disable-next-line:max-line-length
container.bind<PermissionRepository>(TYPES.PermissionRepositoryInterface).to(PermissionRepositoryImpl).inSingletonScope();
container.bind<RoleRepository>(TYPES.RoleRepositoryInterface).to(RoleRepositoryImpl).inSingletonScope();
container.bind<GenericRepository<any>>(TYPES.GenericRepository).to(GenericRepositoryImpl).inSingletonScope();

container.bind<GetDomainsUseCase>(TYPES.GetDomainsUseCase).to(GetDomainsUseCase).inSingletonScope();
container.bind<CreateDomainUseCase>(TYPES.CreateDomainUseCase).to(CreateDomainUseCase).inSingletonScope();
container.bind<FindByIdDomainUseCase>(TYPES.FindByIdDomainUseCase).to(FindByIdDomainUseCase).inSingletonScope();
container.bind<UpdateDomainUseCase>(TYPES.UpdateDomainUseCase).to(UpdateDomainUseCase).inSingletonScope();
container.bind<DeleteDomainUseCase>(TYPES.DeleteDomainUseCase).to(DeleteDomainUseCase).inSingletonScope();

container.bind<GetUsersUseCase>(TYPES.GetUsersUseCase).to(GetUsersUseCase).inSingletonScope();
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase).inSingletonScope();
container.bind<FindByIdUserUseCase>(TYPES.FindByIdUserUseCase).to(FindByIdUserUseCase).inSingletonScope();
container.bind<FindByUsernameUserUseCase>(TYPES.FindByUsernameUserUseCase).to(FindByUsernameUserUseCase).inSingletonScope();
container.bind<UpdateUserUseCase>(TYPES.UpdateUserUseCase).to(UpdateUserUseCase).inSingletonScope();
container.bind<DeleteUserUseCase>(TYPES.DeleteUserUseCase).to(DeleteUserUseCase).inSingletonScope();

container.bind<GetPostsUseCase>(TYPES.GetPostsUseCase).to(GetPostsUseCase).inSingletonScope();
container.bind<CreatePostUseCase>(TYPES.CreatePostUseCase).to(CreatePostUseCase).inSingletonScope();
container.bind<FindByIdPostUseCase>(TYPES.FindByIdPostUseCase).to(FindByIdPostUseCase).inSingletonScope();
container.bind<UpdatePostUseCase>(TYPES.UpdatePostUseCase).to(UpdatePostUseCase).inSingletonScope();
container.bind<DeletePostUseCase>(TYPES.DeletePostUseCase).to(DeletePostUseCase).inSingletonScope();

container.bind<GetPermissionsUseCase>(TYPES.GetPermissionsUseCase).to(GetPermissionsUseCase).inSingletonScope();
container.bind<CreatePermissionUseCase>(TYPES.CreatePermissionUseCase).to(CreatePermissionUseCase).inSingletonScope();
container.bind<FindByIdPermissionUseCase>(TYPES.FindByIdPermissionUseCase).to(FindByIdPermissionUseCase).inSingletonScope();
container.bind<UpdatePermissionUseCase>(TYPES.UpdatePermissionUseCase).to(UpdatePermissionUseCase).inSingletonScope();
container.bind<DeletePermissionUseCase>(TYPES.DeletePermissionUseCase).to(DeletePermissionUseCase).inSingletonScope();

container.bind<GetRolesUseCase>(TYPES.GetRolesUseCase).to(GetRolesUseCase).inSingletonScope();
container.bind<CreateRoleUseCase>(TYPES.CreateRoleUseCase).to(CreateRoleUseCase).inSingletonScope();
container.bind<FindByIdRoleUseCase>(TYPES.FindByIdRoleUseCase).to(FindByIdRoleUseCase).inSingletonScope();
container.bind<UpdateRoleUseCase>(TYPES.UpdateRoleUseCase).to(UpdateRoleUseCase).inSingletonScope();
container.bind<DeleteRoleUseCase>(TYPES.DeleteRoleUseCase).to(DeleteRoleUseCase).inSingletonScope();

container.bind<SignInUseCase>(TYPES.SignInUseCase).to(SignInUseCase).inSingletonScope();

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();

export default container;
