import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import {PermissionDTO} from "../../../domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";

@injectable()
export class FIndByIdPermissionUseCase {
    private permissionRepository: PermissionRepository;

    public constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async execute(id: number): Promise<PermissionDTO> {
        return this.permissionRepository.findById(id);
    }
}
