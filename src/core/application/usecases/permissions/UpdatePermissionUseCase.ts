import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PermissionDTO} from "../../../domain/entities/PermissionDTO";
import {PermissionRepository} from "../../../domain/interfaces/PermissionRepository";

@injectable()
export class UpdatePermissionUseCase {
    private permissionRepository: PermissionRepository;

    public constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepository: PermissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public async execute(id: number, post: PermissionDTO): Promise<PermissionDTO> {
        return this.permissionRepository.update(id, post);
    }
}
