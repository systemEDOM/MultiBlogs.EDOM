import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { UpdatePostsUseCaseInterface } from "./contracts/UpdatePostsUseCaseInterface";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";
import { Post } from "../../entity/Post";

@injectable()
export class UpdatePostsUseCaseImpl implements UpdatePostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }
    
    public handle(id: number, post: Post) {
        return this.postRepository.update(id, post);
    }
}