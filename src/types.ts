const TYPES = {
    // repositories
    GenericRepository: Symbol("GenericRepository"),

    DomainRepositoryInterface: Symbol("DomainRepositoryInterface"),
    UserRepositoryInterface: Symbol("UserRepositoryInterface"),
    PostRepositoryInterface: Symbol("PostRepositoryInterface"),
    PermissionRepositoryInterface: Symbol("PermissionRepositoryInterface"),
    RoleRepositoryInterface: Symbol("RoleRepositoryInterface"),


    // use cases for domains
    GetDomainsUseCase: Symbol("GetDomainsUseCase"),
    CreateDomainUseCase: Symbol("CreateDomainUseCase"),
    FindByIdDomainUseCase: Symbol("FindByIdDomainUseCase"),
    UpdateDomainUseCase: Symbol("UpdateDomainUseCase"),
    DeleteDomainUseCase: Symbol("DeleteDomainUseCase"),


    // use cases for users
    GetUsersUseCase: Symbol("GetUsersUseCase"),
    CreateUserUseCase: Symbol("CreateUserUseCase"),
    FindByIdUserUseCase: Symbol("FindByIdUserUseCase"),
    FindByUsernameUserUseCase: Symbol("FindByUsernameUserUseCase"),
    UpdateUserUseCase: Symbol("UpdateUserUseCase"),
    DeleteUserUseCase: Symbol("DeleteUserUseCase"),


    // use cases for posts
    GetPostsUseCase: Symbol("GetPostsUseCase"),
    CreatePostUseCase: Symbol("CreatePostUseCase"),
    FindByIdPostUseCase: Symbol("FindByIdPostUseCase"),
    UpdatePostUseCase: Symbol("UpdatePostUseCase"),
    DeletePostUseCase: Symbol("DeletePostUseCase"),

    SignInUseCase: Symbol("SignInUseCase"),

    // Middlewares
    AuthMiddleware: Symbol("AuthMiddleware"),
};

export default TYPES;
