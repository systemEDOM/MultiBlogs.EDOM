import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import { CreatePostUseCase } from "./Contracts/CreatePostUseCase";

@injectable()
export class CreatePostUseCaseImpl implements CreatePostUseCase<PostDTO> {
    private postRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(post: PostDTO): Promise<PostDTO> {
        return this.postRepository.create(post);
    }
}
