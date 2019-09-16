import { GetUsersUseCaseInterface } from "./contracts/GetUsersUseCaseInterface";
import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";

@injectable()
export class GetUsersUseCaseImpl implements GetUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }
    
    public handle() {
        return this.userRepository.findAll();
    }
}