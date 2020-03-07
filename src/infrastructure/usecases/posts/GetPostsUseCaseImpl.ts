import { inject, injectable } from "inversify";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import TYPES from "../../../types";
import { GetPostUseCase } from "../../../application/usecases/posts/GetPostsUseCase";

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
