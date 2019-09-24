const TYPES = {
    //repositories
    DomainRepositoryInterface: Symbol('DomainRepositoryInterface'),
    UserRepositoryInterface: Symbol('UserRepositoryInterface'),
    PostRepositoryInterface: Symbol('PostRepositoryInterface'),


    //usescases for domains
    GetDomainsUseCaseInterface: Symbol('GetDomainsUseCaseInterface'),
    CreateDomainsUseCaseInterface: Symbol('CreateDomainsUseCaseInterface'),
    FindByIdDomainsUseCaseInterface: Symbol('FindByIdDomainsUseCaseInterface'),
    UpdateDomainsUseCaseInterface: Symbol('UpdateDomainsUseCaseInterface'),
    DeleteDomainsUseCaseInterface: Symbol('DeleteDomainsUseCaseInterface'),


    //usescases for users
    GetUsersUseCaseInterface: Symbol('GetUsersUseCaseInterface'),
    CreateUsersUseCaseInterface: Symbol('CreateUsersUseCaseInterface'),
    FindByIdUsersUseCaseInterface: Symbol('FindByIdUsersUseCaseInterface'),
    FindByUsernameUsersUseCaseInterface: Symbol('FindByUsernameUsersUseCaseInterface'),
    UpdateUsersUseCaseInterface: Symbol('UpdateUsersUseCaseInterface'),
    DeleteUsersUseCaseInterface: Symbol('DeleteUsersUseCaseInterface'),


    //usescases for posts
    GetPostsUseCaseInterface: Symbol('GetPostsUseCaseInterface'),
    CreatePostsUseCaseInterface: Symbol('CreatePostsUseCaseInterface'),
    FindByIdPostsUseCaseInterface: Symbol('FindByIdPostsUseCaseInterface'),
    UpdatePostsUseCaseInterface: Symbol('UpdatePostsUseCaseInterface'),
    DeletePostsUseCaseInterface: Symbol('DeletePostsUseCaseInterface'),
};

export default TYPES;