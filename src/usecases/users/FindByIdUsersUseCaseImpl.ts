import { inject, injectable } from "inversify";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import TYPES from "../../types";
import { FindByIdUsersUseCaseInterface } from "./contracts/FindByIdUsersUseCaseInterface";

@injectable()
export class FindByIdUsersUseCaseImpl implements FindByIdUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    public handle(id: number) {
        return this.userRepository.findById(id);
    }
}
