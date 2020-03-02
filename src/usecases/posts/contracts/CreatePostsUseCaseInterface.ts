import { Post } from "../../../entity/Post";

export interface CreatePostsUseCaseInterface {
    handle(post: Post);
}
