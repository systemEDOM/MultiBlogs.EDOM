import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { UpdateUsersUseCaseInterface } from "./contracts/UpdateUsersUseCaseInterface";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import { User } from "../../entity/User";

@injectable()
export class UpdateUsersUseCaseImpl implements UpdateUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }
    
    public handle(id: number, user: User) {
        return this.userRepository.update(id, user);
    }
}