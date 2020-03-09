import * as fs from "fs";
import { inject, injectable } from "inversify";
import { PostRepository } from "../../../core/domain/interfaces/PostRepository";
import TYPES from "../../../types";
import { DeletePostUseCase } from "../../../core/application/usecases/posts/DeletePostUseCase";

@injectable()
export class DeletePostsUseCaseImpl implements DeletePostUseCase {
    private postRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public handle(id: number) {
        this.postRepository.findById(id).then((post) => {
            if (post.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + post.image);
            }
        });
        return this.postRepository.delete(id);
    }
}
