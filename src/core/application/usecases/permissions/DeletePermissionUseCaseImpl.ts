import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PermissionDTO} from "../../../domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";
import {DeletePermissionUseCase} from "./Contracts/DeletePermissionUseCase";

@injectable()
export class DeletePermissionUseCaseImpl implements DeletePermissionUseCase<PermissionDTO> {
    private permissionRepository: PermissionRepository;

    constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async execute(id: number): Promise<PermissionDTO> {
        return this.permissionRepository.delete(id);
    }
}
