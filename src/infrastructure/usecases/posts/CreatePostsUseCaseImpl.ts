import { inject, injectable } from "inversify";
import { Post } from "../../domain/entity/Post";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import TYPES from "../../../types";
import { CreatePostUseCase } from "../../../application/usecases/posts/CreatePostUseCase";

@injectable()
export class CreatePostsUseCaseImpl implements CreatePostUseCase {
    private postRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public handle(post: Post) {
        return this.postRepository.create(post);
    }
}
