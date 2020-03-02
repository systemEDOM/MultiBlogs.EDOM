import { inject, injectable } from "inversify";
import {Permission} from "../../entity/Permission";
import { PermissionRepositoryInterface } from "../../repository/Permission/PermissionRepositoryInterface";
import TYPES from "../../types";
import { PermissionService } from "./PermissionService";

@injectable()
export class PermissionServiceImpl implements PermissionService {
    private permissionRepo: PermissionRepositoryInterface;

    constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepo: PermissionRepositoryInterface) {
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