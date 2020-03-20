import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import { RoleDTO } from "../../../domain/entities/RoleDTO";
import { RoleRepository } from "../../../domain/interfaces/RoleRepository";

@injectable()
export class DeleteRoleUseCase {
    private roleRepository: RoleRepository;

    public constructor(@inject(TYPES.RoleRepositoryInterface) roleRepository: RoleRepository) {
        this.roleRepository = roleRepository;
    }

    public async execute(id: number): Promise<RoleDTO> {
        return await this.roleRepository.delete(id);
    }
}
