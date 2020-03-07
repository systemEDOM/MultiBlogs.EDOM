import { inject, injectable } from "inversify";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import TYPES from "../../../types";
import { FindByIdPostUseCase } from "../../../application/usecases/posts/FindByIdPostUseCase";

@injectable()
export class FindByIdPostsUseCaseImpl implements FindByIdPostUseCase {
    private postRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public handle(id: number) {
        return this.postRepository.findById(id);
    }
}
