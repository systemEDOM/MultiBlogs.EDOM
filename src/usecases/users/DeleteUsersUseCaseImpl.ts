import TYPES from "../../types";
import * as fs from 'fs';
import { inject, injectable } from "inversify";
import { DeleteUsersUseCaseInterface } from "./contracts/DeleteUsersUseCaseInterface";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";

@injectable()
export class DeleteUsersUseCaseImpl implements DeleteUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }
    
    public handle(id: number) {
        this.userRepository.findById(id).then(user => {
            if (user.photo !== null)
                fs.unlinkSync('./public/assets/img/avatars/'+user.photo);
        });
        return this.userRepository.delete(id);
    }
}