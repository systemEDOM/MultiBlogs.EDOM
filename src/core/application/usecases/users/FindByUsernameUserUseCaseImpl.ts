import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import TYPES from "../../../../types";
import { FindByUsernameUserUseCase } from "./Contracts/FindByUsernameUserUseCase";
import {UserDTO} from "../../../domain/entities/UserDTO";

@injectable()
export class FindByUsernameUserUseCaseImpl implements FindByUsernameUserUseCase<UserDTO> {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public execute(username: string): Promise<UserDTO> {
        return this.userRepository.findByUsername(username);
    }
}
