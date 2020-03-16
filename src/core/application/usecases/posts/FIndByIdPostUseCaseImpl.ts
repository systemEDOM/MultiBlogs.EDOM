import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import { FindByIdPostUseCase } from "./Contracts/FindByIdPostUseCase";

@injectable()
export class FIndByIdPostUseCaseImpl implements FindByIdPostUseCase<PostDTO> {
    private postRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(id: number): Promise<PostDTO> {
        return this.postRepository.findById(id);
    }
}
