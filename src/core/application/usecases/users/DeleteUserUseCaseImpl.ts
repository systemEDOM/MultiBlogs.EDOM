import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {UserDTO} from "../../../domain/entities/UserDTO";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import { DeleteUserUseCase } from "./Contracts/DeleteUserUseCase";

@injectable()
export class DeleteUserUseCaseImpl implements DeleteUserUseCase<UserDTO> {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(id: number): Promise<UserDTO> {
        this.userRepository.findById(id).then((user) => {
            if (user.photo !== null) {
                fs.unlinkSync("./public/assets/img/avatars/" + user.photo);
            }
        });
        return this.userRepository.delete(id);
    }
}
