import {RepositoryInterface} from "../RepositoryInterface";

// tslint:disable-next-line:interface-name
export interface UserRepositoryInterface extends RepositoryInterface {
    /**
     * Here i can add more methods for specific use
     */
    findByUsername(username: string);
}
