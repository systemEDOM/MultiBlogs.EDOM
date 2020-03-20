import {PostDTO} from "../entities/PostDTO";
import {GenericRepository} from "./GenericRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostRepository extends GenericRepository<PostDTO> {
    /**
     * Here i can add more methods for specific use
     */
}
