import * as fs from "fs";
import { inject, injectable } from "inversify";
import { Post } from "../../domain/entity/Post";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import TYPES from "../../../types";
import { UpdatePostUseCase } from "../../../application/usecases/posts/UpdatePostUseCase";

@injectable()
export class UpdatePostsUseCaseImpl implements UpdatePostUseCase {
    private postRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public handle(id: number, post: Post) {
        this.postRepository.findById(id).then((post) => {
            if (post.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + post.image);
            }
        });
        return this.postRepository.update(id, post);
    }
}
