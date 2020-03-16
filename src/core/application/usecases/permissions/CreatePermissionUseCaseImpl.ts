import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PermissionDTO} from "../../../domain/entities/PermissionDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import {CreatePermissionUseCase} from "./Contracts/CreatePermissionUseCase";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";

@injectable()
export class CreatePermissionUseCaseImpl implements CreatePermissionUseCase<PermissionDTO> {
    private permissionRepository: PermissionRepository;

    constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async execute(permission: PermissionDTO): Promise<PermissionDTO> {
        return this.permissionRepository.create(permission);
    }
}
