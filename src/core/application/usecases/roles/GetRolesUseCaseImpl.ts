import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {RoleDTO} from "../../../domain/entities/RoleDTO";
import {RoleRepository} from "../../../domain/interfaces/RoleRepository";
import {GetRolesUseCase} from "./Contracts/GetRolesUseCase";

@injectable()
export class GetRolesUseCaseImpl implements GetRolesUseCase<RoleDTO> {
    private roleRepository: RoleRepository;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    public async execute(): Promise<RoleDTO[]> {
        return await this.roleRepository.findAll();
    }
}
