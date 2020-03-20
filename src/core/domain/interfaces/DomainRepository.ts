import {DomainDTO} from "../entities/DomainDTO";
import {GenericRepository} from "./GenericRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DomainRepository extends GenericRepository<DomainDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
