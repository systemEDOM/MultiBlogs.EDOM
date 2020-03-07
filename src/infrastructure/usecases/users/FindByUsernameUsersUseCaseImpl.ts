import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import TYPES from "../../../types";
import { FindByUsernameUserUseCase } from "../../../application/usecases/users/FindByUsernameUserUseCase";

@injectable()
export class FindByUsernameUsersUseCaseImpl implements FindByUsernameUserUseCase {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public handle(username: string) {
        return this.userRepository.findByUsername(username);
    }
}
