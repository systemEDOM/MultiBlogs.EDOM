import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { DeleteUsersUseCaseInterface } from "./contracts/DeleteUsersUseCaseInterface";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";

@injectable()
export class DeleteUsersUseCaseImpl implements DeleteUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }
    
    public handle(id: number) {
        return this.userRepository.delete(id);
    }
}