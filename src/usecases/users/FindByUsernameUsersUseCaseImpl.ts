import { inject, injectable } from "inversify";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import TYPES from "../../types";
import { FindByUsernameUsersUseCaseInterface } from "./contracts/FindByUsernameUsersUseCaseInterface";

@injectable()
export class FindByUsernameUsersUseCaseImpl implements FindByUsernameUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    public handle(username: string) {
        return this.userRepository.findByUsername(username);
    }
}
