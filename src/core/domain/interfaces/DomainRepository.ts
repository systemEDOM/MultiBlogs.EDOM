import {DomainDTO} from "../entities/DomainDTO";
import {Repository} from "./Repository";

// tslint:disable-next-line:interface-name no-empty-interface
export interface DomainRepository extends Repository<DomainDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
