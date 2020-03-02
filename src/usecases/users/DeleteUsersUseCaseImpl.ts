import * as fs from "fs";
import { inject, injectable } from "inversify";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import TYPES from "../../types";
import { DeleteUsersUseCaseInterface } from "./contracts/DeleteUsersUseCaseInterface";

@injectable()
export class DeleteUsersUseCaseImpl implements DeleteUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
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
