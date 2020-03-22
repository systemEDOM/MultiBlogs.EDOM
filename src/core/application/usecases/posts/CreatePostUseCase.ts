import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";

@injectable()
export class CreatePostUseCase {
    private postRepository: PostRepository;

    public constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(post: PostDTO): Promise<PostDTO> {
        return this.postRepository.create(post);
    }
}
