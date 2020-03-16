import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import TYPES from "../../../../types";
import { FindByIdUserUseCase } from "./Contracts/FindByIdUserUseCase";
import {UserDTO} from "../../../domain/entities/UserDTO";

@injectable()
export class FindByIdUserUseCaseImpl implements FindByIdUserUseCase<UserDTO> {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(id: number): Promise<UserDTO> {
        return this.userRepository.findById(id);
    }
}
