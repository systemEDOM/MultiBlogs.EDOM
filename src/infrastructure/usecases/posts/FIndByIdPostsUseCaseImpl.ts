import { inject, injectable } from "inversify";
import { PostRepository } from "../../../core/domain/interfaces/PostRepository";
import TYPES from "../../../types";
import { FindByIdPostUseCase } from "../../../core/application/usecases/posts/FindByIdPostUseCase";

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
