import { inject, injectable } from "inversify";
import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import TYPES from "../../../types";
import { GetUsersUseCase } from "../../../core/application/usecases/users/GetUsersUseCase";

@injectable()
export class GetUsersUseCaseImpl implements GetUsersUseCase {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public handle() {
        return this.userRepository.findAll();
    }
}
