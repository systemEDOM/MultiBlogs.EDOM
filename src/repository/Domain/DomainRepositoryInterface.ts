import {RepositoryInterface} from '../RepositoryInterface';

export interface DomainRepositoryInterface<T> extends RepositoryInterface<T> {
    /**
     * Here i can add more methods for specific use
     */
}