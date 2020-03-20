import {PermissionDTO} from "../entities/PermissionDTO";
import {GenericRepository} from "./GenericRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PermissionRepository extends GenericRepository<PermissionDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
