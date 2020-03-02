import { inject, injectable } from "inversify";
import { User } from "../../entity/User";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import TYPES from "../../types";
import { CreateUsersUseCaseInterface } from "./contracts/CreateUsersUseCaseInterface";

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
