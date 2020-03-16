import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PermissionDTO} from "../../../domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";
import {GetPermissionsUseCase} from "./Contracts/GetPermissionsUseCase";

@injectable()
export class GetPermissionsUseCaseImpl implements GetPermissionsUseCase<PermissionDTO> {
    private permissionRepository: PermissionRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async execute(): Promise<PermissionDTO[]> {
        return this.permissionRepository.findAll();
    }
}
