import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PermissionDTO} from "../../../domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";
import {UpdatePermissionUseCase} from "./Contracts/UpdatePermissionUseCase";

@injectable()
export class UpdatePermissionUseCaseImpl implements UpdatePermissionUseCase<PermissionDTO> {
    private permissionRepository: PermissionRepository;

    constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async execute(id: number, post: PermissionDTO): Promise<PermissionDTO> {
        return this.permissionRepository.update(id, post);
    }
}
