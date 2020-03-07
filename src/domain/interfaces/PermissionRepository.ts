import {PermissionDTO} from "../entities/PermissionDTO";
import {Repository} from "./Repository";

// tslint:disable-next-line:interface-name no-empty-interface
export interface PermissionRepository extends Repository<PermissionDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
