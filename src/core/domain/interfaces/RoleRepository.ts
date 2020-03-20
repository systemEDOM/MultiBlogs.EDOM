import {RoleDTO} from "../entities/RoleDTO";
import {GenericRepository} from "./GenericRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RoleRepository extends GenericRepository<RoleDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
