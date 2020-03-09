import {PostDTO} from "../entities/PostDTO";
import {Repository} from "./Repository";

// tslint:disable-next-line:interface-name no-empty-interface
export interface PostRepository extends Repository<PostDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
