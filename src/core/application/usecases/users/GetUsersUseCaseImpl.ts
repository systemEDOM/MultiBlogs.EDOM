import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import TYPES from "../../../../types";
import { GetUsersUseCase } from "./Contracts/GetUsersUseCase";
import {UserDTO} from "../../../domain/entities/UserDTO";

@injectable()
export class GetUsersUseCaseImpl implements GetUsersUseCase<UserDTO> {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(): Promise<UserDTO[]> {
        return this.userRepository.findAll();
    }
}
