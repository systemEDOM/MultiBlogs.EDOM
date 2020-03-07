import { inject, injectable } from "inversify";
import {Permission} from "../../domain/entity/Permission";
import { PermissionRepository } from "../../../domain/interfaces/PermissionRepository";
import TYPES from "../../../types";
import { PermissionService } from "../../../application/services/interfaces/PermissionService";

@injectable()
export class PermissionServiceImpl implements PermissionService {
    private permissionRepo: PermissionRepository;

    constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepo: PermissionRepository) {
        this.permissionRepo = permissionRepo;
    }

    public findAll() {
        return this.permissionRepo.findAll();
    }

    public create(permission: Permission) {
        return this.permissionRepo.create(permission);
    }

    public findById(id: number) {
        return this.permissionRepo.findById(id);
    }

    public update(id: number, permission: Permission) {
        return this.permissionRepo.update(id, permission);
    }

    public delete(id: number) {
        return this.permissionRepo.delete(id);
    }
}