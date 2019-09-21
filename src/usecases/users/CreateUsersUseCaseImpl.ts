import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { CreateUsersUseCaseInterface } from "./contracts/CreateUsersUseCaseInterface";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import { User } from "../../entity/User";

@injectable()
export class CreateUsersUseCaseImpl implements CreateUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }
    
    public handle(user: User) {
        return this.userRepository.create(user);
    }
}