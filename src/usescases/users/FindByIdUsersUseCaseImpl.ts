import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { FindByIdUsersUseCaseInterface } from "./contracts/FindByIdUsersUseCaseInterface";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";

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