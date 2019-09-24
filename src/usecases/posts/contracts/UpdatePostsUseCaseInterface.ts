import { Post } from "../../../entity/Post";

export interface UpdatePostsUseCaseInterface {
    handle(id: number, post: Post);
}