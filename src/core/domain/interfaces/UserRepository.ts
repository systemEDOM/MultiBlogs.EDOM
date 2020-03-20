import {UserDTO} from "../entities/UserDTO";
import {GenericRepository} from "./GenericRepository";

export interface UserRepository extends GenericRepository<UserDTO> {
    /**
     * Here i can add more methods for specific use
     */
    findByUsername(username: string): Promise<any>;
}
