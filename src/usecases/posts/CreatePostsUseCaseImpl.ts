import { inject, injectable } from "inversify";
import { Post } from "../../entity/Post";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";
import TYPES from "../../types";
import { CreatePostsUseCaseInterface } from "./contracts/CreatePostsUseCaseInterface";

@injectable()
export class CreatePostsUseCaseImpl implements CreatePostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }

    public handle(post: Post) {
        return this.postRepository.create(post);
    }
}
