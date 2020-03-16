import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import TYPES from "../../../../types";
import { CreateUserUseCase } from "./Contracts/CreateUserUseCase";
import {UserDTO} from "../../../domain/entities/UserDTO";

@injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase<UserDTO> {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(user: UserDTO): Promise<UserDTO> {
        return this.userRepository.create(user);
    }
}
