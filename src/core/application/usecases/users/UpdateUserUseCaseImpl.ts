import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {UserDTO} from "../../../domain/entities/UserDTO";
import { RoleRepository } from "../../../domain/interfaces/RoleRepository";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import { UpdateUserUseCase } from "./Contracts/UpdateUserUseCase";

@injectable()
export class UpdateUserUseCaseImpl implements UpdateUserUseCase<UserDTO> {
    private userRepository: UserRepository;
    private roleRepository: RoleRepository;

    constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository,
                @inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public async execute(id: number, user: UserDTO): Promise<UserDTO> {
        // tslint:disable-next-line:no-shadowed-variable
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
