import * as fs from "fs";
import { inject, injectable } from "inversify";
import { User } from "../../entity/User";
import { RoleRepositoryInterface } from "../../repository/Role/RoleRepositoryInterface";
import { UserRepositoryInterface } from "../../repository/User/UserRepositoryInterface";
import TYPES from "../../types";
import { UpdateUsersUseCaseInterface } from "./contracts/UpdateUsersUseCaseInterface";

@injectable()
export class UpdateUsersUseCaseImpl implements UpdateUsersUseCaseInterface {
    private userRepository: UserRepositoryInterface;
    private roleRepository: RoleRepositoryInterface;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepositoryInterface,
                @inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepositoryInterface) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public async handle(id: number, user: User) {
        const userObj = await this.userRepository.findById(id).then( async (user) => {
            if (user.photo !== null) {
                fs.unlinkSync("./public/assets/img/avatars/" + user.photo);
            }
            return user;
        });
        if (user.role) {
            userObj.role = await this.roleRepository.findById( Number(user.role) ).then( (role) => role);
        }
        userObj.name = user.name;
        userObj.username = user.username;
        userObj.email = user.email;
        userObj.password = user.password;
        userObj.photo = user.photo;
        return this.userRepository.create(userObj);
    }
}
