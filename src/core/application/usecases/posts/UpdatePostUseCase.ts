import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";

@injectable()
export class UpdatePostUseCase {
    private postRepository: PostRepository;

    public constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(id: number, post: PostDTO): Promise<PostDTO> {
        await this.postRepository.findById(id).then( postDTO => {
            if (postDTO.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + postDTO.image);
            }
        });
        return this.postRepository.update(id, post);
    }
}
