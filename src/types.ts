const TYPES = {
    //repositories
    DomainRepositoryInterface: Symbol('DomainRepositoryInterface'),
    UserRepositoryInterface: Symbol('UserRepositoryInterface'),
    PostRepositoryInterface: Symbol('PostRepositoryInterface'),
    PermissionRepositoryInterface: Symbol('PermissionRepositoryInterface'),


    //use cases for domains
    GetDomainsUseCaseInterface: Symbol('GetDomainsUseCaseInterface'),
    CreateDomainsUseCaseInterface: Symbol('CreateDomainsUseCaseInterface'),
    FindByIdDomainsUseCaseInterface: Symbol('FindByIdDomainsUseCaseInterface'),
    UpdateDomainsUseCaseInterface: Symbol('UpdateDomainsUseCaseInterface'),
    DeleteDomainsUseCaseInterface: Symbol('DeleteDomainsUseCaseInterface'),


    //use cases for users
    GetUsersUseCaseInterface: Symbol('GetUsersUseCaseInterface'),
    CreateUsersUseCaseInterface: Symbol('CreateUsersUseCaseInterface'),
    FindByIdUsersUseCaseInterface: Symbol('FindByIdUsersUseCaseInterface'),
    FindByUsernameUsersUseCaseInterface: Symbol('FindByUsernameUsersUseCaseInterface'),
    UpdateUsersUseCaseInterface: Symbol('UpdateUsersUseCaseInterface'),
    DeleteUsersUseCaseInterface: Symbol('DeleteUsersUseCaseInterface'),


    //use cases for posts
    GetPostsUseCaseInterface: Symbol('GetPostsUseCaseInterface'),
    CreatePostsUseCaseInterface: Symbol('CreatePostsUseCaseInterface'),
    FindByIdPostsUseCaseInterface: Symbol('FindByIdPostsUseCaseInterface'),
    UpdatePostsUseCaseInterface: Symbol('UpdatePostsUseCaseInterface'),
    DeletePostsUseCaseInterface: Symbol('DeletePostsUseCaseInterface'),


    //Services
    AuthService: Symbol('AuthService'),
    PermissionService: Symbol('PermissionService'),


    //Middlewares
    AuthMiddleware: Symbol('AuthMiddleware'),
};

export default TYPES;