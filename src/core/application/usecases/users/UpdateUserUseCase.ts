import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import { UserDTO } from "../../../domain/entities/UserDTO";
import { RoleRepository } from "../../../domain/interfaces/RoleRepository";
import { UserRepository } from "../../../domain/interfaces/UserRepository";
import slugify from "slugify";
import * as bcrypt from "bcrypt";

@injectable()
export class UpdateUserUseCase {
    private userRepository: UserRepository;
    private roleRepository: RoleRepository;

    public constructor(@inject(TYPES.UserRepositoryInterface) userRepository: UserRepository,
        @inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public async execute(id: number, user: UserDTO): Promise<UserDTO> {
        const userObj = await this.userRepository.findById(id).then(userDTO => {
            if (userDTO.photo !== null) {
                fs.unlinkSync("./public/assets/img/avatars/" + userDTO.photo);
            }
            return userDTO;
        });
        if (user.role) {
            userObj.role = await this.roleRepository.findById(Number(user.role)).then( role => role);
        }
        userObj.name = user.name;
        userObj.username = slugify(user.username);
        userObj.email = user.email;
        userObj.password = await bcrypt.hash(user.password, 10).then( result => result);
        userObj.photo = user.photo;
        return this.userRepository.create(userObj);
    }
}
