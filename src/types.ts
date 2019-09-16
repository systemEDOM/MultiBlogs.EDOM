const TYPES = {
    //repositories
    DomainRepositoryInterface: Symbol('DomainRepositoryInterface'),
    UserRepositoryInterface: Symbol('UserRepositoryInterface'),


    //usescases for domains
    GetDomainsUseCaseInterface: Symbol('GetDomainsUseCaseInterface'),
    CreateDomainsUseCaseInterface: Symbol('CreateDomainsUseCaseInterface'),
    FindByIdDomainsUseCaseInterface: Symbol('FindByIdDomainsUseCaseInterface'),
    UpdateDomainsUseCaseInterface: Symbol('UpdateDomainsUseCaseInterface'),
    DeleteDomainsUseCaseInterface: Symbol('DeleteDomainsUseCaseInterface'),


    //usescases for domains
    GetUsersUseCaseInterface: Symbol('GetUsersUseCaseInterface'),
    CreateUsersUseCaseInterface: Symbol('CreateUsersUseCaseInterface'),
    FindByIdUsersUseCaseInterface: Symbol('FindByIdUsersUseCaseInterface'),
    FindByUsernameUsersUseCaseInterface: Symbol('FindByUsernameUsersUseCaseInterface'),
    UpdateUsersUseCaseInterface: Symbol('UpdateUsersUseCaseInterface'),
    DeleteUsersUseCaseInterface: Symbol('DeleteUsersUseCaseInterface'),
};

export default TYPES;