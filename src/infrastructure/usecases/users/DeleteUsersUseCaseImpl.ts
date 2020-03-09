import * as fs from "fs";
import { inject, injectable } from "inversify";
import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import TYPES from "../../../types";
import { DeleteUserUseCase } from "../../../core/application/usecases/users/DeleteUserUseCase";

@injectable()
export class DeleteUsersUseCaseImpl implements DeleteUserUseCase {
    private userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public handle(id: number) {
        this.userRepository.findById(id).then((user) => {
            if (user.photo !== null) {
                fs.unlinkSync("./public/assets/img/avatars/" + user.photo);
            }
        });
        return this.userRepository.delete(id);
    }
}
