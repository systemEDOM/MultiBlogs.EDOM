import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {RoleDTO} from "../../../domain/entities/RoleDTO";
import {RoleRepository} from "../../../domain/interfaces/RoleRepository";
import {DeleteRoleUseCase} from "./Contracts/DeleteRoleUseCase";

@injectable()
export class DeleteRoleUseCaseImpl implements DeleteRoleUseCase<RoleDTO> {
    private roleRepository: RoleRepository;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    public async execute(id: number): Promise<RoleDTO> {
        await this.roleRepository.findById(id).then((user) => {
            if (user.photo !== null) {
                fs.unlinkSync("./public/assets/img/avatars/" + user.photo);
            }
        });
        return await this.roleRepository.delete(id);
    }
}
