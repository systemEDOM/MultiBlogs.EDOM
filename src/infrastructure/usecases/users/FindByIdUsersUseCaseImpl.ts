import { inject, injectable } from "inversify";
import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import TYPES from "../../../types";
import { FindByIdUserUseCase } from "../../../core/application/usecases/users/FindByIdUserUseCase";

@injectable()
export class FindByIdUsersUseCaseImpl implements FindByIdUserUseCase {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public handle(id: number) {
        return this.userRepository.findById(id);
    }
}
