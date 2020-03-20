import { inject, injectable } from "inversify";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import TYPES from "../../../../types";
import {UserDTO} from "../../../domain/entities/UserDTO";

@injectable()
export class FindByUsernameUserUseCase {
    private userRepository: UserRepository;

    public constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(username: string): Promise<UserDTO> {
        return await this.userRepository.findByUsername(username);
    }
}
