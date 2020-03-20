import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PermissionDTO} from "../../../domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";

@injectable()
export class GetPermissionsUseCase {
    private permissionRepository: PermissionRepository;

    public constructor(@inject(TYPES.PostRepositoryInterface) permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async execute(): Promise<PermissionDTO[]> {
        return this.permissionRepository.findAll();
    }
}
