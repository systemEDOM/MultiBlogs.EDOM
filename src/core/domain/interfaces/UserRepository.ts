import {UserDTO} from "../entities/UserDTO";
import {Repository} from "./Repository";

// tslint:disable-next-line:interface-name
export interface UserRepository extends Repository<UserDTO> {
    /**
     * Here i can add more methods for specific use
     */
    findByUsername(username: string);
}
