import { inject, injectable } from "inversify";
import { PostRepository } from "../../../core/domain/interfaces/PostRepository";
import TYPES from "../../../types";
import { GetPostUseCase } from "../../../core/application/usecases/posts/GetPostsUseCase";

@injectable()
export class GetPostsUseCaseImpl implements GetPostUseCase {
    private posRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) posRepository: PostRepository) {
        this.posRepository = posRepository;
    }

    public handle() {
        return this.posRepository.findAll();
    }
}
