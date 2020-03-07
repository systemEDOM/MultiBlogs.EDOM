import {RoleDTO} from "../entities/RoleDTO";
import {Repository} from "./Repository";

// tslint:disable-next-line:interface-name no-empty-interface
export interface RoleRepository extends Repository<RoleDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
