import TYPES from "../../types";
import * as fs from 'fs';
import { inject, injectable } from "inversify";
import { UpdateUsersUseCaseInterface } from "./contracts/UpdateUsersUseCaseInterface";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import { User } from "../../entity/User";

@injectable()
export class UpdateUsersUseCaseImpl implements UpdateUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }
    
    public handle(id: number, user: User) {
        this.userRepository.findById(id).then(user => {
            if (user.photo !== null)
                fs.unlinkSync('./public/assets/img/avatars/'+user.photo);
        });
        return this.userRepository.update(id, user);
    }
}