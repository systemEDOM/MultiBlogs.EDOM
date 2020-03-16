import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {RoleRepository} from "../../../domain/interfaces/RoleRepository";
import {FindByIdRoleUseCase} from "./Contracts/FindByIdRoleUseCase";
import {RoleDTO} from "../../../domain/entities/RoleDTO";

@injectable()
export class FindByIdRoleUseCaseImpl implements FindByIdRoleUseCase<RoleDTO> {
    private roleRepository: RoleRepository;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    public async execute(id: number): Promise<RoleDTO> {
        return await this.roleRepository.findById(id);
    }
}
