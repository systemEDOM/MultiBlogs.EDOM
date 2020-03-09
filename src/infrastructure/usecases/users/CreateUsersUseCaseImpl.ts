import { inject, injectable } from "inversify";
import { User } from "../../domain/entity/User";
import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import TYPES from "../../../types";
import { CreateUserUseCase } from "../../../core/application/usecases/users/CreateUserUseCase";

@injectable()
export class CreateUsersUseCaseImpl implements CreateUserUseCase {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public handle(user: User) {
        return this.userRepository.create(user);
    }
}
