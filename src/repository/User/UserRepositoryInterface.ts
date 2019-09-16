import {RepositoryInterface} from '../RepositoryInterface';

export interface UserRepositoryInterface extends RepositoryInterface {
    /**
     * Here i can add more methods for specific use
     */
    findByUsername(username: string);
}